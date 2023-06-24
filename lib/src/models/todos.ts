import { InferModel, sql } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const todoStatusEnum = pgEnum('todoStatus', ['todo', 'doing', 'done']);

export const todos = pgTable('todos', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid ()`),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: todoStatusEnum('status').default('todo').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export type Todo = InferModel<typeof todos>;
