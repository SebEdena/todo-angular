import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTodo, TodoStatus, UpdateTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <h2>Edit Todo</h2>
    <form [formGroup]="todoForm">
      <div class="form-field">
        <label for="title">Title</label>
        <input id="title" name="title" formControlName="title" />
      </div>
      <div class="form-field">
        <label for="description">Description</label>
        <input id="description" name="description" formControlName="description" />
      </div>
      <div class="form-field">
        <label for="status">Status</label>
        <select id="status" name="status" formControlName="status">
          <option *ngFor="let status of todoStatusList" [value]="status">
            {{ status | uppercase }}
          </option>
        </select>
        <input id="status" name="status" formControlName="status" />
      </div>
    </form>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailComponent implements OnChanges {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  todoStatusList = Object.values(TodoStatus);

  @Input() id?: string;

  todoForm = this.fb.group({
    title: this.fb.nonNullable.control<string>('', Validators.required),
    description: this.fb.nonNullable.control<string>('', Validators.required),
    status: this.fb.nonNullable.control<TodoStatus>(TodoStatus.TODO, Validators.required),
  });
  todo!: CreateTodo | UpdateTodo;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      const todo = this.todoService.getTodo(this.id);
      if (todo) {
        this.todo = todo;
      } else {
        this.router.navigate([]);
      }
    }
  }
}
