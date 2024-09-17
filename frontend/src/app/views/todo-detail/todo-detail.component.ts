import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CreateTodo, TodoStatus, UpdateTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { SpinnerComponent } from '../../components/ui/spinner/spinner.component';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  template: `
    <h2 class="pb-10">{{ isNewTodo() ? 'Create Todo' : 'Edit Todo' }}</h2>
    @if (todoService.loading() || this.todo() === undefined) {
      <app-spinner />
    } @else {
      <app-todo-form [todo]="todo()!" [isNewTodo]="isNewTodo()" (saveTodo)="saveTodo($event)" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TodoFormComponent, SpinnerComponent],
})
export class TodoDetailComponent {
  private router = inject(Router);

  todoService = inject(TodoService);

  todoStatusList = Object.values(TodoStatus);

  id = input<string>();
  todo = signal<CreateTodo | UpdateTodo | undefined>({
    title: '',
    description: '',
    status: TodoStatus.TODO,
  });

  isNewTodo = computed(() => !this.id());

  constructor() {
    effect(async () => {
      if (this.id()) {
        const todo = await firstValueFrom(this.todoService.get(this.id()!));

        if (todo) {
          this.todo.set(todo);
        } else {
          this.router.navigate(['/todos']);
        }
      }
    });
  }

  async saveTodo(todo: CreateTodo | UpdateTodo) {
    let todoOrError: CreateTodo | UpdateTodo | Error;
    if (this.isNewTodo()) {
      todoOrError = await firstValueFrom(this.todoService.create(todo));
    } else {
      todoOrError = await firstValueFrom(this.todoService.update(this.id()!, todo));
    }
    if (todoOrError instanceof Error) {
      console.error(todoOrError.message);
    }
  }
}
