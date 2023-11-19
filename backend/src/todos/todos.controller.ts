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
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginated } from 'src/utils/api-paginated.decorator';
import { Todo } from '../models';
import { CreateTodo, FindParams, ReadTodo, UpdateTodo } from '../schemas';
import { FindParamsPipe } from '../utils/find-params.decorator';
import { GetTodo, TodoInterceptor } from './todos.dependencies';
import { TodosService } from './todos.service';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  /**
   * Query a page of todos
   * @param params Parameters of the query
   * @returns A page of todos
   */
  @Get()
  @ApiPaginated(ReadTodo)
  findAll(@Query(ValidationPipe, FindParamsPipe<Todo>) params: FindParams<Todo>) {
    return this.todosService.find(params);
  }

  @Get(':todoId')
  @UseInterceptors(TodoInterceptor)
  findOne(@Query('todoId') todoId: string, @GetTodo() todo: Todo): ReadTodo {
    return todo;
  }

  @Post()
  create(@Body() createTodoDto: CreateTodo) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':todoId')
  @UseInterceptors(TodoInterceptor)
  update(
    @Query('todoId') todoId: string,
    @GetTodo() todo: Todo,
    @Body() updateTodoDto: UpdateTodo,
  ) {
    return this.todosService.update(todo, updateTodoDto);
  }

  @Delete(':todoId')
  @UseInterceptors(TodoInterceptor)
  remove(@Query('todoId') todoId: string, @GetTodo() todo: Todo) {
    return this.todosService.delete(todo);
  }
}
