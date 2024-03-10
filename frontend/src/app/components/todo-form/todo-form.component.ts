import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
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
      <form class="bg-neutral-accent" [formGroup]="todoForm" (submit)="saveForm()">
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
        <button type="submit">{{ id() ? 'Update' : 'Create' }}</button>
      </form>
    </div>
  `,
  styles: `
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
  ],
})
export class TodoFormComponent {
  private fb = inject(FormBuilder);
  private todoService = inject(TodoService);

  todoStatusList = Object.values(TodoStatus);

  id = input<string | undefined>(undefined);
  todo = input.required<CreateTodo | UpdateTodo>();

  todoForm = this.fb.group({
    title: this.fb.nonNullable.control<string>('', Validators.required),
    description: this.fb.nonNullable.control<string>('', Validators.required),
    status: this.fb.nonNullable.control<TodoStatus>(TodoStatus.TODO, Validators.required),
  });

  constructor() {
    effect(
      () => {
        this.todoForm.patchValue(this.todo());
      },
      { allowSignalWrites: true },
    );
  }

  saveForm() {
    const id = this.id();
    if (id) {
      this.todoService.update(id, this.todoForm.getRawValue());
    } else {
      this.todoService.create(this.todoForm.getRawValue());
    }
  }
}
