import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from 'src/app/services/todo.service';
import { TodoDetailComponent } from './todo-detail.component';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(() => {
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
