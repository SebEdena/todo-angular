import { Injectable } from '@nestjs/common';
import { todos } from 'lib/dist/models';
import { WriteTodoDto } from 'lib/dist/schemas';
import { DrizzleService } from 'src/drizzle/drizzle.service';

@Injectable()
export class TodosService {

  constructor(private drizzle: DrizzleService) {
    drizzle.db.select().from(todos);
  }
  
  create(createTodoDto: WriteTodoDto) {
    return 'This action adds a new todo';
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: WriteTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
