import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should defined', () => {
    // Assert
    expect(component).toBeDefined();
  });

  it(`should have as title 'package_tracking_frontend'`, () => {
    // Assert
    expect(component.title).toEqual('package_tracking_frontend');
  });
});
