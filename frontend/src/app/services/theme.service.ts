import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  platform = inject(PLATFORM_ID);

  theme = signal<Theme>(Theme.LIGHT);
  private userThemePreference?: MediaQueryList;

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platform)) {
        if (this.theme() === Theme.DARK) {
          localStorage.setItem('theme', 'dark');
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        } else {
          localStorage.setItem('theme', 'light');
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      }
    });
    afterNextRender(() => {
      this.userThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
      this.userThemePreference.addEventListener('change', this.checkTheme);
      this.checkTheme();
    });
  }

  checkTheme() {
    this.theme.set(this.getThemeFromPreferences());
    if (!document.documentElement.classList.contains('theme-loaded')) {
      document.documentElement.classList.add('theme-loaded');
    }
  }

  private getThemeFromPreferences() {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && this.userThemePreference?.matches)
    ) {
      return Theme.DARK;
    } else {
      return Theme.LIGHT;
    }
  }

  ngOnDestroy(): void {
    this.userThemePreference?.removeEventListener('change', this.checkTheme);
  }
}
