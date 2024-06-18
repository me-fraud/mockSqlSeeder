import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { fixturesAmount } from '@/env';
import { EOrganization } from '@/entities/organization.entity';
import { EBuilding } from '@/entities/building.entity';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const organizationFactory = factoryManager.get(EOrganization)
    const buildingFactory = factoryManager.get(EBuilding)

    console.log('Seeding organizations')
    await organizationFactory.saveMany(fixturesAmount.organizations);
    console.log('Seeding buildings')
    await buildingFactory.saveMany(fixturesAmount.buildings);
  }
}

