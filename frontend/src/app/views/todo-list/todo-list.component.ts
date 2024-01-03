import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { TodoService } from 'src/app/services/todo.service';
import { RefreshSpinnerComponent } from '../../components/refresh-spinner/refresh-spinner.component';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxMasonryModule, TodoCardComponent, RefreshSpinnerComponent],
  template: `
    <section class="pb-5">
      <ngx-masonry>
        @for (todo of todosService.items(); track todo.id) {
          @defer (on viewport) {
            <app-todo-card ngxMasonryItem [todo]="todo" />
          } @placeholder (minimum 500ms) {
            <p ngxMasonryItem >Loading...</p>
          }
        }
      </ngx-masonry>
      <app-refresh-spinner />
    </section>
  `,
  styles: `
    section {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  `,
})
export class TodoListComponent {
  todosService = inject(TodoService);
}
