import { Injectable } from '@angular/core';
import { CreateTodo, ReadTodo, UpdateTodo } from '../models/todos';
import { QueryParams } from '../utils/filter';
import { CrudService, ITEMS_PER_PAGE } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends CrudService<ReadTodo, CreateTodo, UpdateTodo> {
  protected override baseUrl = '/todos';

  override loadParams: Partial<QueryParams> = {
    orderBy: { updatedAt: 'DESC' },
    limit: ITEMS_PER_PAGE,
  };
}
