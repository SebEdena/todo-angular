import { AuditBase } from './base';

export interface ReadTodo extends CreateTodo, AuditBase {}

export interface CreateTodo {
  title: string;
  description: string;
  status: TodoStatus;
}

export interface UpdateTodo extends CreateTodo {}

export enum TodoStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}
