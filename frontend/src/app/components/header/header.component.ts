import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddTodoButtonComponent } from '../add-todo-btn/add-todo-btn.component';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="py-20">
      <h1 class="pointer" routerLink="/">My todos.</h1>
      <span>
        <app-add-todo-button />
        <app-theme-switcher />
      </span>
    </header>
  `,
  styles: [
    `
      header {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      button {
        --bg-color-light: color-mix(in srgb, transparent, #fff 30%);
        --bg-color-lighter: color-mix(in srgb, transparent, #fff 20%);

        &:hover {
          background-color: var(--bg-color-light);
        }

        &:active {
          background-color: var(--bg-color-lighter);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule, ThemeSwitcherComponent, AddTodoButtonComponent],
})
export class HeaderComponent {}
