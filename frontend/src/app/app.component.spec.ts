import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
      declarations: [MockComponent(HeaderComponent)],
      imports: [AppComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
