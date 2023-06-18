import { Injectable } from "@nestjs/common";
import { drizzle } from "drizzle-orm/postgres-js";
import { todos } from "lib/dist/models";
import postgres from "postgres";
import { config } from "src/config";

@Injectable()
export class DrizzleService {
    private pool = postgres(config().databaseUrl, { max: 10 });
    private drizzleDb = drizzle(this.pool, { schema: { todos } });

    get db(): typeof this.drizzleDb {
        return this.drizzleDb;
    }
}