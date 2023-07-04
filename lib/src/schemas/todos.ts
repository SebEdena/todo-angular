import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { todos } from '../models/todos.js';

export const readTodoSchema = createSelectSchema(todos);
export const createTodoSchema = createInsertSchema(todos)
  .pick({ title: true, description: true, status: true })
  .partial({ status: true });
export const updateTodoSchema = createTodoSchema.partial();

export class ReadTodoDto extends createZodDto(readTodoSchema) {}
export class CreateTodoDto extends createZodDto(createTodoSchema) {}
export class UpdateTodoDto extends createZodDto(updateTodoSchema) {}
