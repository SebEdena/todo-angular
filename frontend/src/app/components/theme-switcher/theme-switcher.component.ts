import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Theme, ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="p-10 bg-transparent" (click)="toggleTheme()">
      <span class="icon-size-15" [ngClass]="iconClass()"></span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  private themeService = inject(ThemeService);

  iconClass = computed(() => (this.themeService.theme() === Theme.DARK ? 'icon-sun' : 'icon-moon'));

  toggleTheme() {
    this.themeService.theme.update((theme) => (theme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  }
}
