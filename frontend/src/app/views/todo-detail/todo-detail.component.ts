import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CreateTodo, TodoStatus, UpdateTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { SpinnerComponent } from '../../components/ui/spinner/spinner.component';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  template: `
    <h2 class="pb-10">{{ id() ? 'Edit Todo' : 'Create Todo' }}</h2>
    @if (todoService.loading() || this.todo() === undefined) {
      <app-spinner />
    } @else {
      <app-todo-form [id]="id()" [todo]="todo()!" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, TodoFormComponent, SpinnerComponent],
})
export class TodoDetailComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  todoService = inject(TodoService);

  todoStatusList = Object.values(TodoStatus);

  id = input<string>();
  todo = toSignal(
    this.activatedRoute.data.pipe(
      takeUntilDestroyed(),
      map((data: { todo?: CreateTodo | UpdateTodo }) => data.todo),
    ),
  );
  todoLoadError = computed(() => !this.todo());

  constructor() {
    console.log('in constructor');

    effect(() => {
      if (this.todoLoadError()) {
        this.router.navigate(['/todos']);
      }
    });
  }
}
