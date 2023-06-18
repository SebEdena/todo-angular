const faker = require('@faker-js/faker').faker;
const config = require('dotenv').config;
const drizzle = require('drizzle-orm/postgres-js').drizzle;
const { todoStatusEnum, todos } = require('lib/dist/models/index.js');
const postgres = require('postgres');
config({ path: '../.env'});

const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/todos';
const sql = postgres(dbUrl, { max: 1 });
const db = drizzle(sql);

(async () => {
  await db.delete(todos);

  const todoList = [];
  
  for (let i = 0; i < 1000; i++) {
    todoList.push({
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.company.buzzPhrase(),
      status: faker.helpers.arrayElement(todoStatusEnum.enumValues),
    });
  }
  
  await db.insert(todos).values(todoList);
  process.exit(0);
})()
