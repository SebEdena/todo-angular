import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import { todos } from '../models/todos';

export const readTodoSchema = createSelectSchema(todos);
export const writeTodoSchema = createInsertSchema(todos);

export class ReadTodoDto extends createZodDto(readTodoSchema) {}
export class WriteTodoDto extends createZodDto(writeTodoSchema) {}
