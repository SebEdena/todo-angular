import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  template: `<div class="skeleton"></div>`,
  styles: `
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
    
    @keyframes shine {
        to {
          background-position-x: -20%;
        }
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {}
