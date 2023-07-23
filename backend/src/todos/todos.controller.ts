import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Todo } from '../models';
import { CreateTodo, UpdateTodo } from '../schemas';
import { FindParams } from '../utils/crud';
import { FindParamsPipe } from '../utils/find-params.decorator';
import { GetTodo, TodoInterceptor } from './todos.dependencies';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodo) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Query(ValidationPipe, FindParamsPipe<Todo>) params: Partial<FindParams<Todo>>) {
    return this.todosService.find(params);
  }

  @Get(':todoId')
  @UseInterceptors(TodoInterceptor)
  findOne(@GetTodo() todo: Todo) {
    return todo;
  }

  @Patch(':todoId')
  @UseInterceptors(TodoInterceptor)
  update(@GetTodo() todo: Todo, @Body() updateTodoDto: UpdateTodo) {
    return this.todosService.update(todo, updateTodoDto);
  }

  @Delete(':todoId')
  @UseInterceptors(TodoInterceptor)
  remove(@GetTodo() todo: Todo) {
    return this.todosService.delete(todo);
  }
}
