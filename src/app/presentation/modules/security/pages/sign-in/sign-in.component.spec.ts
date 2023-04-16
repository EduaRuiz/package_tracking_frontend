import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthModel } from '@infrastructure/models';
import { DataSignUpService } from '../../services';
import { NotificationService } from '@presentation/shared/services';
import { PackageTrackingDelegate } from '@application/delegator';
import { SignInComponent } from './sign-in.component';
import { TypewriterComponent } from '@presentation/components';
import { HttpErrorResponse } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  let mockRouter: any;
  let mockSignInUC: any;
  let mockDataSignUpService: any;
  let mockNotificationService: any;

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };
    mockSignInUC = { toSignIn: jest.fn(), execute: jest.fn() };
    mockDataSignUpService = { setData: jest.fn() };
    mockNotificationService = { showMessage: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [SignInComponent, TypewriterComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: PackageTrackingDelegate, useValue: mockSignInUC },
        { provide: DataSignUpService, useValue: mockDataSignUpService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onGoogle', () => {
    it('should call toSignIn and handlerSuccess', () => {
      // Arrange
      const mockAuthModel: AuthModel = {
        data: {
          _id: '1234',
          email: 'test@test.com',
          firebaseId: '1234',
          name: 'Test User',
        },
        token: '1234',
      };
      jest.spyOn(mockSignInUC, 'toSignIn');
      jest.spyOn(mockSignInUC, 'execute').mockReturnValue(of(mockAuthModel));
      jest.spyOn(component, 'handlerSuccess');

      // Act
      component.onGoogle();

      // Assert
      expect(mockSignInUC.toSignIn).toHaveBeenCalled();
      expect(mockSignInUC.execute).toHaveBeenCalled();
      expect(component.handlerSuccess).toHaveBeenCalledWith(mockAuthModel);
    });

    it('should call toSignIn and handlerError', () => {
      // Arrange
      const mockError = { status: 401, message: 'Unauthorized' };
      jest.spyOn(mockSignInUC, 'toSignIn');
      jest
        .spyOn(mockSignInUC, 'execute')
        .mockReturnValue(throwError(mockError));
      jest.spyOn(component, 'handlerError');

      // Act
      component.onGoogle();

      // Assert
      expect(mockSignInUC.toSignIn).toHaveBeenCalled();
      expect(mockSignInUC.execute).toHaveBeenCalled();
      expect(component.handlerError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('handlerSuccess', () => {
    it('should set user information and navigate to index/sign-up', () => {
      // Arrange
      const mockAuthModel: AuthModel = {
        data: {
          _id: '1234',
          email: 'test@test.com',
          firebaseId: '1234',
          name: 'Test User',
        },
        token: '1234',
      };
      jest.spyOn(mockDataSignUpService, 'setData');
      jest.spyOn(localStorage, 'setItem');
      jest.spyOn(mockNotificationService, 'showMessage');
      jest.spyOn(mockRouter, 'navigate');

      // Act
      component.handlerSuccess(mockAuthModel);

      // Assert
      expect(mockDataSignUpService.setData).toHaveBeenCalledWith(
        mockAuthModel.data.email,
        mockAuthModel.data.firebaseId,
        mockAuthModel.data.name
      );
      expect(mockNotificationService.showMessage).not.toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['index/sign-up']);
    });

    it('should navigate to sign-up when firebaseId is defined', () => {
      // Arrange
      const mockAuthModel: AuthModel = {
        data: {
          _id: '1234',
          email: 'test@test.com',
          firebaseId: '1234',
          name: 'Test User',
        },
        token: '1234',
      };
      jest.spyOn(mockRouter, 'navigate');

      // Act
      component.handlerSuccess(mockAuthModel);

      // Assert
      expect(mockRouter.navigate).toHaveBeenCalledWith(['index/sign-up']);
    });

    it('when firebaseId is undefined', () => {
      // Arrange
      const mockAuthModel: AuthModel = {
        data: {
          _id: '1234',
          email: 'test@test.com',
          firebaseId: undefined,
          name: 'Test User',
        },
        token: '1234',
      };
      jest.spyOn(mockRouter, 'navigate');
      jest.spyOn(localStorage, 'setItem');
      jest.spyOn(mockNotificationService, 'showMessage');

      // Act
      component.handlerSuccess(mockAuthModel);

      // Assert
      expect(mockDataSignUpService.setData).not.toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['dashboard']);
      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'Success',
        'Welcome Test User',
        'success'
      );
    });

    it('should not show message when firebaseId is defined', () => {
      // Arrange
      const mockAuthModel: AuthModel = {
        data: {
          _id: '1234',
          email: 'test@test.com',
          firebaseId: '1234',
          name: 'Test User',
        },
        token: '1234',
      };
      jest.spyOn(mockNotificationService, 'showMessage');

      // Act
      component.handlerSuccess(mockAuthModel);

      // Assert
      expect(mockNotificationService.showMessage).not.toHaveBeenCalled();
    });
  });

  describe('handlerError', () => {
    it('should set unauthorized flag to true', () => {
      // Arrange
      const mockError = {
        error: { message: 'Unauthorized' },
      } as HttpErrorResponse;

      // Act
      component.handlerError(mockError);

      // Assert
      expect(mockNotificationService.showMessage).toBeCalled();
    });
  });
});
