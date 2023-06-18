import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';
dotenv.config();

export default {
  schema: '../lib/dist/models/*',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
