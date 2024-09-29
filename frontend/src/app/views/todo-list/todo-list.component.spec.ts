import { faker } from '@faker-js/faker';
import { render } from '@testing-library/angular';
import { createSpyFromClass } from 'jest-auto-spies';
import { readTodo } from 'lib';
import { ReadTodo } from 'src/app/models/todos';
import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from './todo-list.component';

async function setup(todos: ReadTodo[] = []) {
  const mockTodoService = createSpyFromClass(TodoService, ['delete', 'items']);
  mockTodoService.items.mockReturnValue(todos);
  const { fixture } = await render(`<app-todo-list />`, {
    imports: [TodoListComponent],
    providers: [
      {
        provide: TodoService,
        useValue: mockTodoService,
      },
    ],
  });

  return {
    fixture: fixture,
    component: fixture.componentInstance,
    properties: {
      mockTodoService,
    },
  };
}

describe('TodoListComponent', () => {
  it('should list todos', async () => {
    const todos = faker.helpers.multiple(() => readTodo() as ReadTodo, { count: 5 });
    const { component, properties } = await setup(todos);

    expect(component).toBeTruthy();
  });
});
