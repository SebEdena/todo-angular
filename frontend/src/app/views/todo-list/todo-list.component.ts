import { ChangeDetectionStrategy, Component, TrackByFunction, inject } from '@angular/core';
import { ReadTodo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todo.service';
import { RefreshSpinnerComponent } from '../../components/refresh-spinner/refresh-spinner.component';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pb-5">
      @for (todo of todosService.items(); track todo.id) {
      <app-todo-card [todo]="todo" />
      }
      <app-refresh-spinner />
    </section>
  `,
  styles: [
    `
      section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    `,
  ],
  imports: [TodoCardComponent, RefreshSpinnerComponent],
})
export class TodoListComponent {
  todosService = inject(TodoService);

  trackTodos: TrackByFunction<ReadTodo> = (_index: number, item: ReadTodo) => {
    return item.id;
  };
}
