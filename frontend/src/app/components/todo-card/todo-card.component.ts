import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReadTodoDto } from 'lib';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="bg-primary">
      <div class="bg-neutral-accent p-10">
        <h2 class="title font-size-12">{{ todo.title }}</h2>
        <p class="description">{{ todo.description }}</p>
        <span class="date font-size-8">{{ todo.updatedAt }}</span>
        <span class="status font-size-8">{{ todo.status | uppercase }}</span>
      </div>
    </article>
  `,
  styles: [
    `
      article {
        &,
        & > div {
          cursor: pointer;
          border-radius: 8px;
        }

        &:hover > div {
          $border: 3px;
          transform: translate(-$border, -$border);
          transition: all 0.2s;
        }

        & > div {
          display: grid;
          grid-template-areas:
            'title title'
            'description description'
            'date status';
          gap: 0.5rem;
          grid-template-columns: auto;
          grid-template-rows: auto;
          $areas: 'title', 'description', 'date', 'status';

          @each $area in $areas {
            .#{$area} {
              grid-area: #{$area};
            }
          }

          .status {
            text-align: end;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input({ required: true }) todo!: ReadTodoDto;
}
