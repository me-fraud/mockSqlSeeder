import { appDataSource } from "@/dbConfig";
import { runSeeders } from "typeorm-extension";
import cors from 'cors';
import { envConfig } from "@/env";
import { OrganizationRoute } from '@/routes/organization.route';
import { BuildingRoute } from '@/routes/building.route';
import express from 'express';
import { Application, RequestHandler } from 'express';
import { IRoute } from '@/interfaces/IRoute.interface';
import { parse as pathParse } from 'path';
import { AppInit } from "@/interfaces/AppInit.interface";
import { errorHandler } from "@/middleware/errorHandler.middleware";

const seedsMain = async () => {
  await appDataSource.synchronize(true);
  await runSeeders(appDataSource);
  {
    process.exit()
  }
}

class SeederApp {
  public app: Application;
  public port: number;
  constructor(appInit: AppInit) {
    this.app = express();
    this.port = appInit.port;
    this.initMiddlewares(appInit.middlewares);
    this.initAssets();
    this.initRoutes(appInit.controllers);
    this.initErrorHandlers();
  }
  private initRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initMiddlewares(middlewares: RequestHandler[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initAssets() {
    this.app.use(express.json());
    this.app.use(express.static('./public'))
  }
  private initErrorHandlers = () => {
    this.app.use('*', (req, res) => {
      res.status(404).send({
        success: false,
        message: 'Resource not found',
      });
    });
    this.app.use(errorHandler());
  };
  public async listen() {
    await appDataSource.initialize()
    const http = this.app.listen(this.port, () => {
    });

    http.on("listening", () => {
      seedsMain()
      console.log(`Seeder App is listening on the http://localhost:${this.port}`);
    })
    process.on("exit", () => {
      appDataSource.destroy();
    })
  }
}

if ((pathParse(process.argv[1]).name == 'init.seeds')) {
  const appSeed = new SeederApp({
    port: envConfig.port,
    middlewares: [cors({
      origin: ['http://localhost:8080', 'http://localhost:8877'],
    })],
    controllers: [
      new OrganizationRoute(),
      new BuildingRoute(),
    ]
  })

  appSeed.listen();
}
