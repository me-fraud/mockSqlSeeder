import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './db/seeds/main.seeder';
import { EOrganization } from './entities/organization.entity';
import { EBuilding } from './entities/building.entity';
import { BuildingsFactory } from './db/factories/Buildings.factory';
import { OrganizationsFactory } from './db/factories/organizations.factory';
import { parse as pathParse } from 'path';


const dataSourceConfig: DataSourceOptions = {
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: 'sa',
  password: "1Secure*Password1",
  database: "mock",
  synchronize: true,
  logging: false,
  "extra": {
    "trustServerCertificate": true  // Trust the self-signed certificate
  },
  entities: [EOrganization, EBuilding]
}

const mockDataSourceConfig: DataSourceOptions & SeederOptions = {
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: 'sa',
  password: "1Secure*Password1",
  database: "mock",
  synchronize: true,
  logging: false,
  "extra": {
    "trustServerCertificate": true  // Trust the self-signed certificate
  },
  entities: [EOrganization, EBuilding],
  seeds: [MainSeeder],
  factories: [OrganizationsFactory, BuildingsFactory]
}



export const appDataSource = (pathParse(process.argv[1]).name == 'init.seeds') ? new DataSource(mockDataSourceConfig) : new DataSource(dataSourceConfig)