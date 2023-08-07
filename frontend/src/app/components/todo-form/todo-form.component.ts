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
import { SelectComponent } from '../ui/select/select.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
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
      <app-select
        [options]="todoStatusList"
        formControlName="status"
        label="Status"
        name="status"
      ></app-select>
      <input type="submit" [value]="id ? 'Update' : 'Create'" />
    </form>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent],
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
