import { Module } from '@nestjs/common';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [DrizzleService],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
