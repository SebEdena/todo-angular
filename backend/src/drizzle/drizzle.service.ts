import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { todos } from 'lib/dist/models';
import postgres from 'postgres';

@Injectable()
export class DrizzleService {
  constructor(private config: ConfigService) {}

  private pool = postgres(this.config.get<string>('databaseUrl'), { max: 10 });
  private drizzleDb = drizzle(this.pool, { schema: { todos } });

  get db(): typeof this.drizzleDb {
    return this.drizzleDb;
  }
}
