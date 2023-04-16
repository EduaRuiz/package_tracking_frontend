import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AuthModel } from '@infrastructure/models';
import { PackageTrackingDelegate } from '@application/delegator';
import { NotificationService } from '../../shared/services/notification.service';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from '../components.module';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockRouter: { navigate: jest.Mock };
  let mockSignOutUC: { toSignOut: jest.Mock; execute: jest.Mock };
  let mockNotificationService: { showMessage: jest.Mock };

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };
    mockSignOutUC = { toSignOut: jest.fn(), execute: jest.fn() };
    mockNotificationService = { showMessage: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: PackageTrackingDelegate, useValue: mockSignOutUC },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
      imports: [RouterTestingModule, ComponentsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    const currentUser: AuthModel = {
      data: {
        _id: '',
        email: 'test@test.com',
        firebaseId: '12345',
        name: 'Test User',
      },
      token: 'test-token',
    };
    localStorage.setItem('user', JSON.stringify(currentUser.data));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('user');
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should sign out the user', () => {
    // Arrange
    const successMessage = 'You have been signed out';
    mockSignOutUC.execute.mockReturnValueOnce(of(null));

    // Act
    component.signOut();

    // Assert
    expect(mockSignOutUC.toSignOut).toHaveBeenCalled();
    expect(mockSignOutUC.execute).toHaveBeenCalled();
    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Success',
      successMessage,
      'success'
    );
  });

  it('should show an error message if sign out failed', () => {
    // Arrange
    const errorMessage = 'Sign out failed';
    mockSignOutUC.execute.mockReturnValueOnce(
      throwError(() => new Error(errorMessage))
    );

    // Act
    component.signOut();

    // Assert
    expect(mockSignOutUC.toSignOut).toHaveBeenCalled();
    expect(mockSignOutUC.execute).toHaveBeenCalled();
    expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
      'Error',
      errorMessage,
      'error'
    );
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
