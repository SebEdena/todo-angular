import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Todo } from '../models';
import { CreateTodo, UpdateTodo } from '../schemas';
import { CrudService } from '../utils/crud';

@Injectable()
export class TodosService extends CrudService<Todo, CreateTodo, UpdateTodo> {
  constructor(protected em: EntityManager) {
    super(em, Todo);
  }
}
