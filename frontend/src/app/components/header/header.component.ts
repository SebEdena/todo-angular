import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="py-20">
      <h1>My todos.</h1>
      <app-theme-switcher />
    </header>
  `,
  styles: [
    `
      header {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ThemeSwitcherComponent],
})
export class HeaderComponent {}
