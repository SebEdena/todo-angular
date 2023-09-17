import { OmitType } from '@nestjs/swagger';
import { Todo } from '../models/todos.entity';

export class ReadTodo extends Todo {}
export class CreateTodo extends OmitType(ReadTodo, ['id', 'createdAt', 'updatedAt', 'deletedAt']) {}
export class UpdateTodo extends CreateTodo {}
