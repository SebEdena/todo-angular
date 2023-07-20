import { Entity, Enum, Property } from '@mikro-orm/core';
import { AuditBase } from './base';

@Entity()
export class Todo extends AuditBase {
  @Property()
  title!: string;

  @Property({ columnType: 'text' })
  description!: string;

  @Enum(() => TodoStatus)
  status: TodoStatus = TodoStatus.TODO;
}

export enum TodoStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}
