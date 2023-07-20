import type { EntityManager } from '@mikro-orm/core';
import { Factory, Seeder } from '@mikro-orm/seeder';
import { readTodo } from 'lib';
import { Todo } from '../../src/models';

class TodoFactory extends Factory<Todo> {
  model = Todo;

  definition() {
    return <Partial<Todo>>readTodo();
  }
}

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await new TodoFactory(em).create(1000);
  }
}
