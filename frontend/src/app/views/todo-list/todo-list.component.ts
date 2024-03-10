import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';
import { NgxMasonryComponent, NgxMasonryModule } from 'ngx-masonry';
import { TodoService } from 'src/app/services/todo.service';
import { RepeatDirective } from 'src/app/utils/repeat.directive';
import { RefreshSpinnerComponent } from '../../components/refresh-spinner/refresh-spinner.component';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pb-5">
      <ngx-masonry style="width: 100%;">
        @defer (on immediate) {
          @for (todo of todosService.items(); track todo.id) {
            <app-todo-card ngxMasonryItem [todo]="todo" (delete)="removeTodo(todo.id)" />
          }
        } @placeholder {
          <ng-container *ngTemplateOutlet="placeholder"> </ng-container>
        } @loading (minimum 1000ms) {
          <ng-container *ngTemplateOutlet="placeholder"> </ng-container>
        }
        <ng-template #placeholder>
          <div class="placeholder" *repeat="20" [style.height]="getRandomHeight()" ngxMasonryItem>
            <app-skeleton />
          </div>
        </ng-template>
      </ngx-masonry>
      <app-refresh-spinner />
    </section>
  `,
  styles: `
    section {
      ngx-masonry {
        container-type: inline-size;
      }

      app-todo-card, .placeholder {
        width: clamp(500px, 50%, 800px); padding: 0.5em;

        @container(max-width: 1000px)  {
          width: 100%;
        }
      }
    }

  `,
  imports: [
    NgxMasonryModule,
    NgTemplateOutlet,
    RepeatDirective,
    TodoCardComponent,
    RefreshSpinnerComponent,
    SkeletonComponent,
  ],
})
export class TodoListComponent implements AfterViewInit, OnDestroy {
  todosService = inject(TodoService);

  masonry = viewChild.required(NgxMasonryComponent);

  ngAfterViewInit(): void {
    this.masonry().layout();
    window.addEventListener('resize', () => this.masonry().layout());
  }

  getRandomHeight() {
    return `${100 + Math.random() * 100}px`;
  }

  removeTodo(id: string) {
    this.todosService.delete(id);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.masonry().layout());
  }
}
