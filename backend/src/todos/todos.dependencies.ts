import { ExecutionContext, Injectable, createParamDecorator } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Todo } from 'src/models';
import { CreateTodo, ReadTodo } from 'src/schemas/todos.dto';
import { IdToValueInterceptor } from '../utils/id-to-value.interceptor';
import { TodosService } from './todos.service';

@Injectable()
export class TodoInterceptor extends IdToValueInterceptor<Todo, CreateTodo, ReadTodo> {
  key = 'todoId';

  constructor(protected config: ConfigService, protected todos: TodosService) {
    super(config, todos);
  }

  protected getId(request: any): string {
    return request.params.todoId;
  }

  protected setValue(request: any, entity: Todo): void {
    request.todo = entity;
  }
}

export const GetTodo = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.todo as Todo;
});
