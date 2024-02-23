import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateTodo, TodoStatus, UpdateTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { SpinnerComponent } from '../../components/ui/spinner/spinner.component';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  template: `
    <h2 class="pb-10">{{ id() ? 'Edit Todo' : 'Create Todo' }}</h2>
    @if (todoService.loading()) {
      <app-spinner />
    } @else {
      <app-todo-form [id]="id()" [todo]="todo()" />
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
  todo = signal<CreateTodo | UpdateTodo>({ title: '', description: '', status: TodoStatus.TODO });

  constructor() {
    effect(
      () => {
        const id = this.id();
        if (id) {
          this.todoService.get(id).subscribe((t) => {
            if (t) {
              this.todo.set(t);
            } else {
              this.router.navigate([]);
            }
          });
        }
      },
      { allowSignalWrites: true },
    );
  }
}
