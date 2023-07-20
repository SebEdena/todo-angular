import { MikroORMOptions } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { ConfigModule } from '@nestjs/config';
import { config } from '../src/config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [config],
});

export default {
  ...config().orm,
  entities: [`./dist/models`],
  entitiesTs: [`./src/models`],
  extensions: [Migrator, SeedManager],
  migrations: {
    tableName: '_migrations', // name of database table with log of executed transactions
    path: 'orm/migrations', // path to the folder with migrations
    fileName: (timestamp: string, name?: string) => {
      if (!name) {
        throw new Error('Specify migration name via `mikro-orm migration:create --name=...`');
      }
      return `${name}_${timestamp}`;
    },
  },
  seeder: {
    path: 'orm/seeders', // path to the folder with seeders
  },
} as MikroORMOptions;
