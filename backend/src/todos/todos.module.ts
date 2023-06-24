import { Module } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, DrizzleService],
})
export class TodosModule {}
