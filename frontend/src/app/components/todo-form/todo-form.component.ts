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
import { ButtonComponent } from '../ui/button/button.component';
import { InputComponent } from '../ui/input/input.component';
import { SelectComponent } from '../ui/select/select.component';
import { TextareaComponent } from '../ui/textarea/textarea.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  template: `
    <div class="form-container">
      <form class="bg-neutral" [formGroup]="todoForm" (submit)="saveForm()">
        <app-input formControlName="title" label="Title" name="title"></app-input>
        <app-textarea
          formControlName="description"
          label="Description"
          name="description"
        ></app-textarea>
        <app-select
          [options]="todoStatusList"
          formControlName="status"
          label="Status"
          name="status"
        ></app-select>
        <app-button type="submit">{{ id ? 'Update' : 'Create' }}</app-button>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        background: var(--primary);
        background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%);

        border-radius: 15px;
        padding: 10px;
      }

      form {
        display: flex;
        flex-flow: column wrap;
        gap: 10px;
        padding: 10px;
        border-radius: 10px;
      }

      app-button {
        margin-top: 5px;
        align-self: flex-end;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
  ],
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
