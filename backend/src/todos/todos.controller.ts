import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTodoDto, ReadTodoDto, UpdateTodoDto, readTodoSchema } from 'lib/dist/schemas';
import { ZodSerializerDto } from 'nestjs-zod';
import { PageDto, ResourceQuery } from '../utils';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ZodSerializerDto(ReadTodoDto)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ZodSerializerDto(PageDto(readTodoSchema))
  findAll(@Query() params: ResourceQuery) {
    return this.todosService.findAll(params);
  }

  @Get(':id')
  @ZodSerializerDto(ReadTodoDto)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ZodSerializerDto(ReadTodoDto)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ZodSerializerDto(ReadTodoDto)
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
