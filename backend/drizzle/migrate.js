const dotenv = require('dotenv');
const drizzle = require('drizzle-orm/postgres-js').drizzle;
const migrate = require('drizzle-orm/postgres-js/migrator').migrate;
const postgres = require('postgres');
dotenv.config({ path: '../.env'});

const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/todos';

const sql = postgres(dbUrl, { max: 1 });
const db = drizzle(sql);

(async () => {
    await migrate(db, { migrationsFolder: 'drizzle/migrations' })

    process.exit(0)
})()