import { ComponentFixture, TestBed } from '@angular/core/testing';

import { readTodo } from '@lib';
import { MockInstance, MockService } from 'ng-mocks';
import { ReadTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';
import { TodoDetailComponent } from './todo-detail.component';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  MockInstance.scope('case');

  beforeEach(() => {
    MockService(TodoService);
    MockInstance(TodoService, 'get', async (id: string) => {
      const todo = readTodo();
      todo.id = id;
      return todo as ReadTodo;
    });
    TestBed.configureTestingModule({
      imports: [TodoDetailComponent],
      providers: [TodoService],
    });
    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
