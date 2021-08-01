import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });
  });

  it('should create the app', (): void => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });
});
