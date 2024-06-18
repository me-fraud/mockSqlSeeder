import App from '@/app';
import cors from 'cors';
import { envConfig } from './env';
import { OrganizationRoute } from './routes/organization.route';
import { BuildingRoute } from './routes/building.route';


export const app = new App({
  port: envConfig.port,
  middlewares: [
    cors({
      origin: ['*'],
    }),
  ],
  controllers: [
    new OrganizationRoute(),
    new BuildingRoute(),
  ],
});

app.listen();










