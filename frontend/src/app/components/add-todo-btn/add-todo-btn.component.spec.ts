import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoButtonComponent } from './add-todo-btn.component';

describe('AddTodoBtnComponent', () => {
  let component: AddTodoButtonComponent;
  let fixture: ComponentFixture<AddTodoButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddTodoButtonComponent],
    });
    fixture = TestBed.createComponent(AddTodoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
