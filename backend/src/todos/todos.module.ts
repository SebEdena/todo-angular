import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Todo } from '../models';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
