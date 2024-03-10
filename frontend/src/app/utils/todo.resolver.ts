import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { tap } from 'rxjs';
import { CreateTodo, TodoStatus, UpdateTodo } from '../models/todos';
import { TodoService } from '../services/todo.service';

export const todoResolver: ResolveFn<CreateTodo | UpdateTodo | undefined> = (
  route,
  _state,
  todoService = inject(TodoService),
) => {
  if (!route.params['id']) {
    console.log('loaded in resolver');
    return { title: '', description: '', status: TodoStatus.TODO };
  } else {
    return todoService.get(route.params['id']).pipe(tap(() => console.log('loaded in resolver')));
  }
};
