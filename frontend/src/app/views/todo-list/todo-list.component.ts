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
          @defer (on immediate) {
            @for (todo of todosService.items(); track todo.id) {
                <app-todo-card ngxMasonryItem [todo]="todo" />
            } @empty { 
              <a>Hi</a>
            }
          } @placeholder (minimum 500ms) {
            <div class="placeholder" ngxMasonryItem [style.--height]="'200px'">
              <div class="skeleton"></div>
            </div>
          } @loading (minimum 500ms) {
            <div class="placeholder" ngxMasonryItem [style.--height]="'200px'">
              <div class="skeleton"></div>
            </div>
          }
      </ngx-masonry>
      <app-refresh-spinner />
    </section>
  `,
  styles: `
    section {
      app-todo-card, .placeholder {
        width: 50%; padding: 0.5em;
      }

      .placeholder {
        height: var(--height, 50px);
      }
      .skeleton {
        --base: var(--neutral-accent);
        --accent: var(--font);
        height: 100%;
        background-color: color-mix(in srgb, var(--base), transparent 30%);
        background: linear-gradient(
          100deg,
          transparent 40%,
          color-mix(in srgb, var(--font), transparent 85%) 50%,
          transparent 60%
        ) color-mix(in srgb, var(--base), transparent 30%);
        background-size: 200% 100%;
        background-position-x: 180%;
        border-radius: 5px;
        animation: 1s shine linear infinite;
      }
    }

    @keyframes shine {
      to {
        background-position-x: -20%;
      }
    }

  `,
})
export class TodoListComponent {
  todosService = inject(TodoService);

  getRandomHeight() {
    return `${100 + Math.random() * 100}px`;
  } 
}
