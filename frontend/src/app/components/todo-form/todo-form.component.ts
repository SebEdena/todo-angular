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
import { CreateTodo, TodoStatus, UpdateTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="todoForm" (submit)="saveForm()">
      <div class="form-field">
        <label for="title">Title</label>
        <input id="title" name="title" formControlName="title" />
      </div>
      <div class="form-field">
        <label for="description">Description</label>
        <textarea id="description" name="description" formControlName="description"></textarea>
      </div>
      <div class="form-field">
        <label for="status">Status</label>
        <select id="status" name="status" formControlName="status">
          <option *ngFor="let status of todoStatusList" [value]="status">
            {{ status | uppercase }}
          </option>
        </select>
      </div>
      <input type="submit" [value]="id ? 'Update' : 'Create'" />
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  todoStatusList = Object.values(TodoStatus);

  @Input() id?: string = undefined;
  @Input({ required: true }) todo!: CreateTodo | UpdateTodo;

  todoForm = this.fb.group({
    title: this.fb.nonNullable.control<string>('', Validators.required),
    description: this.fb.nonNullable.control<string>('', Validators.required),
    status: this.fb.nonNullable.control<TodoStatus>(TodoStatus.TODO, Validators.required),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo']) {
      this.todoForm.patchValue(this.todo);
    }
  }

  saveForm() {
    if (this.id) {
      this.todoService.update(this.id, this.todoForm.getRawValue());
    } else {
      this.todoService.create(this.todoForm.getRawValue());
    }
  }
}
