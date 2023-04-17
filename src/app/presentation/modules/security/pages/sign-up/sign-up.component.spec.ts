import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NotificationService } from '../../../../shared/services/notification.service';
import { DataSignUpService } from '../../services';
import { SignUpComponent } from './sign-up.component';
import { PackageTrackingDelegate } from '@application/delegator';
import { AuthModel } from '@infrastructure/models';
import { TypewriterComponent } from '@presentation/components';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockNotificationService: any;
  let mockSignUpUC: any;
  let mockDataSignUpService: any;

  beforeEach(async () => {
    mockNotificationService = { showMessage: jest.fn() };
    mockSignUpUC = {
      toSignUp: jest.fn(),
      execute: jest.fn().mockReturnValue(of({})),
    };
    mockDataSignUpService = { getData: jest.fn().mockReturnValue(of({})) };

    await TestBed.configureTestingModule({
      declarations: [SignUpComponent, TypewriterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: PackageTrackingDelegate, useValue: mockSignUpUC },
        { provide: DataSignUpService, useValue: mockDataSignUpService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    // Assert
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should set the form values if there is data available', () => {
      // Arrange
      const email = 'test@test.com';
      const name = 'Test User';
      const firebaseId = '1234';
      jest
        .spyOn(mockSignUpUC, 'execute')
        .mockReturnValue(of({ email, name, firebaseId }));

      jest
        .spyOn(mockDataSignUpService, 'getData')
        .mockReturnValue(of({ email, name, firebaseId }));

      mockDataSignUpService.getData.mockReturnValue(
        of({ email, name, firebaseId })
      );

      Object.defineProperty(component, 'email', {
        value: email,
      });
      Object.defineProperty(component, 'name', {
        value: name,
      });
      Object.defineProperty(component, 'firebaseId', {
        value: firebaseId,
      });

      // Act
      component.ngOnInit();

      // Assert
      expect(mockDataSignUpService.getData).toHaveBeenCalled();
      expect(component.checkoutForm.get('email')?.value).toBe(email);
      expect(component.checkoutForm.get('name')?.value).toBe(name);
    });

    it('should navigate to the sign-in page if there is no email available', () => {
      // Arrange
      mockDataSignUpService.getData.mockReturnValue(of({}));

      // Act
      component.ngOnInit();

      // Assert
      expect(mockDataSignUpService.getData).toHaveBeenCalled;
    });
  });

  describe('clear', () => {
    it('should clear the form values', () => {
      // Arrange
      Object.defineProperty(component, 'email', {
        value: 'email',
      });
      Object.defineProperty(component, 'name', {
        value: 'name',
      });
      Object.defineProperty(component, 'firebaseId', {
        value: 'firebaseId',
      });

      // Act
      component.clear();

      // Assert
      expect(component.checkoutForm.get('email')?.value).toBe('email');
      expect(component.checkoutForm.get('name')?.value).toBe('name');
    });
  });

  describe('onSubmit', () => {
    it('should call the sign up use case', () => {
      // Arrange
      const email = 'email';
      const name = 'name of user';
      const firebaseId = 'firebaseId';
      const phone = '555555555';
      const document = '55555555';
      jest
        .spyOn(mockDataSignUpService, 'getData')
        .mockReturnValue(of({ email, name, firebaseId }));
      jest
        .spyOn(mockSignUpUC, 'execute')
        .mockReturnValue(
          of({ _id: '1234', email, name, firebaseId, phone, document })
        );
      Object.defineProperty(component, 'email', {
        value: email,
      });
      Object.defineProperty(component, 'name', {
        value: name,
      });
      Object.defineProperty(component, 'firebaseId', {
        value: firebaseId,
      });
      component.checkoutForm.get('phone')?.setValue(phone);
      component.checkoutForm.get('document')?.setValue(document);
      component.checkoutForm.get('email')?.setValue(email);
      component.checkoutForm.get('name')?.setValue(name);

      // Act
      component.onSubmit();

      // Assert
      expect(mockSignUpUC.toSignUp).toHaveBeenCalledWith();
      expect(mockSignUpUC.execute).toHaveBeenCalledWith({
        email,
        name,
        firebaseId,
        phone,
        document,
      });
    });

    it('should call the sign up use case', () => {
      // Arrange
      const email = 'email';
      const name = 'name of user';
      const firebaseId = 'firebaseId';
      const phone = '555555555';
      const document = '55555555';
      jest
        .spyOn(mockDataSignUpService, 'getData')
        .mockReturnValue(of({ email, name, firebaseId }));

      jest
        .spyOn(mockSignUpUC, 'execute')
        .mockReturnValue(throwError(() => new Error('error')));
      Object.defineProperty(component, 'email', {
        value: email,
      });
      Object.defineProperty(component, 'name', {
        value: name,
      });
      Object.defineProperty(component, 'firebaseId', {
        value: firebaseId,
      });
      component.checkoutForm.get('phone')?.setValue(phone);
      component.checkoutForm.get('document')?.setValue(document);
      component.checkoutForm.get('email')?.setValue(email);
      component.checkoutForm.get('name')?.setValue(name);

      // Act
      component.onSubmit();

      // Assert
      expect(mockSignUpUC.toSignUp).toHaveBeenCalledWith();
      expect(mockSignUpUC.execute).toHaveBeenCalledWith({
        email,
        name,
        firebaseId,
        phone,
        document,
      });
    });
  });

  describe('handlerError', () => {
    it('should show a message', () => {
      // Arrange
      const error = {
        error: { error: { message: '' } },
      } as unknown as HttpErrorResponse;

      // Act
      component.handlerError(error);

      // Assert
      expect(mockNotificationService.showMessage).toHaveBeenCalledWith(
        'error',
        'Something went wrong',
        'error'
      );
    });
  });

  describe('handlerSuccess', () => {
    it('should navigate to the dashboard', () => {
      // Arrange
      const user: AuthModel = {
        data: {
          _id: '1234',
          email: 'email',
          name: 'name',
        },
        token: 'token',
      };

      // Act
      component.handlerSuccess(user);

      // Assert
      expect(mockNotificationService.showMessage).toHaveBeenCalled();
    });
  });

  describe('handlerMessage', () => {
    it('should show a Enter email here', () => {
      // Arrange
      const message = 'Enter email here';

      // Act
      const result = component.handlerMessage('email');

      // Assert
      expect(result).toBe(message);
    });

    it('should show a Please provide a valid document', () => {
      // Arrange
      const message = 'Please provide a valid document';
      component.checkoutForm.get('document')?.setValue('document');

      // Act
      const result = component.handlerMessage('document');

      // Assert
      expect(result).toBe(message);
    });

    it('should show a 7 chars minimum', () => {
      // Arrange
      const message = '7 chars minimum';
      component.checkoutForm.get('document')?.setValue('123');

      // Act
      const result = component.handlerMessage('document');

      // Assert
      expect(result).toBe(message);
    });

    it('should show a 10 chars maximum', () => {
      // Arrange
      const message = '10 chars maximum';
      component.checkoutForm.get('document')?.setValue('12345678910');

      // Act
      const result = component.handlerMessage('document');

      // Assert
      expect(result).toBe(message);
    });
  });
});
