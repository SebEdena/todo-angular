import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div ng-scroll>
      <app-header />
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      div {
        margin: auto;
        width: 80%;
      }
    `,
  ],
  imports: [RouterOutlet, HeaderComponent],
})
export class AppComponent {}
