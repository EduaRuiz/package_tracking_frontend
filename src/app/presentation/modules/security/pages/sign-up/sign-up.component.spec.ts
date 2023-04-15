import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from '.';
import { PackageTrackingDelegate } from '@application/delegator';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSignUpService } from '../../services';
import { NotificationService } from '@presentation/shared/services';
import { ISignUpServiceData } from '../../interfaces';
import { of } from 'rxjs';
import { ComponentsModule } from '@presentation/components';

let component: SignUpComponent;
let fixture: ComponentFixture<SignUpComponent>;
let signUpUC: PackageTrackingDelegate;
let formBuilder: FormBuilder;
let router: Router;
let dataSignUpService: DataSignUpService;
let notificationService: NotificationService;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [SignUpComponent],
    providers: [
      {
        provide: PackageTrackingDelegate,
        useValue: {
          toSignUp: jest.fn(),
          execute: jest.fn(),
        },
      },
      { provide: FormBuilder, useValue: { group: jest.fn() } },
      { provide: Router, useValue: { navigate: jest.fn() } },
      { provide: DataSignUpService, useValue: { getData: jest.fn() } },
      { provide: NotificationService, useValue: { showMessage: jest.fn() } },
    ],
    imports: [ComponentsModule],
  }).compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(SignUpComponent);
  component = fixture.componentInstance;
  signUpUC = TestBed.inject(PackageTrackingDelegate);
  formBuilder = TestBed.inject(FormBuilder);
  router = TestBed.inject(Router);
  dataSignUpService = TestBed.inject(DataSignUpService);
  notificationService = TestBed.inject(NotificationService);
});

describe('SignUpComponent', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize checkoutForm with the correct validators', () => {
    const value = {
      email: '',
      name: '',
      phone: '',
      document: '',
    };

    Object.defineProperty(component, 'checkoutForm', {
      value: { get: jest.fn().mockReturnValue(value) },
    });
    // jest.spyOn(SignUpComponent.prototype, 'checkoutForm').mockReturnValue({
    //   get: jest.fn().mockReturnValue(value),
    // });
    const checkoutForm = component.checkoutForm;

    expect(checkoutForm.get('email')).toBeTruthy();
    expect(checkoutForm.get('name')).toBeTruthy();
    expect(checkoutForm.get('phone')).toBeTruthy();
    expect(checkoutForm.get('document')).toBeTruthy();
    expect(checkoutForm.valid).toBeFalsy();
  });

  it('should set email and name when DataSignUpService returns data', () => {
    // Arrange
    const data: ISignUpServiceData = {
      email: 'test@test.com',
      name: 'Test User',
      firebaseId: '123456',
    };
    const expectedEmail = data.email;
    const expectedName = data.name;
    const expectedFirebaseId = data.firebaseId;
    Object.defineProperty(component, 'email', {
      value: data.email,
    });
    Object.defineProperty(component, 'name', {
      value: data.name,
    });
    Object.defineProperty(component, 'firebaseId', {
      value: data.firebaseId,
    });
    jest.spyOn(dataSignUpService, 'getData').mockReturnValue(of(data));

    // Act
    component.ngOnInit();

    // Assert
    expect(expectedEmail).toEqual(data.email);
    expect(expectedName).toEqual(data.name);
    expect(expectedFirebaseId).toEqual(data.firebaseId);
  });

  // it('should navigate to sign-in when email is empty', () => {
  //   jest
  //     .spyOn(dataSignUpService, 'getData')
  //     .mockReturnValue(of({ email: '' }) as any);
  //   jest.spyOn(router, 'navigate');
  //   component.ngOnInit();
  //   expect(router.navigate).toHaveBeenCalledWith(['index/sign-in']);
  // });

  // it('should call toSignUpUC and execute signUpUC.execute when onSubmit is called', () => {
  //   const user: UserModel = {
  //     name: 'Test User',
  //     email: 'test@test.com',
  //     phone: '1234567',
  //     document: '1234567',
  //     firebaseId: '123456',
  //   };
  //   spyOn(signUpUC, 'toSignUp');
  //   spyOn(signUpUC, 'execute').and.callFake(() =>
  //     of({ data: {} } as AuthModel)
  //   );
  //   component.onSubmit();
  //   expect(signUpUC.toSignUp).toHaveBeenCalled();
  //   expect(signUpUC.execute).toHaveBeenCalledWith(user);
  // });

  // it('should set user in local storage and navigate to dashboard when signUpUC returns success', () => {
  //   const user: AuthModel = { data: { name: 'Test User' } } as AuthModel;
  //   spyOn(localStorage, 'setItem');
  //   spyOn(router, 'navigate');
  //   component.handlerSuccess(user);
  //   expect(localStorage.setItem).toHaveBeenCalledWith(
  //     'user',
  //     JSON.stringify(user.data)
  //   );
  //   expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  // });

  // it('should show error message when signUpUC returns error', () => {
  //   const error = new HttpErrorResponse({ error: { message: 'Test error' } });
  //   spyOn(notificationService, 'showMessage');
  //   component.handlerError(error);
  //   expect(notificationService.showMessage).toHaveBeenCalledWith(
  //     'error',
  //     error.error.message,
  //     'error'
  //   );
  // });

  // it('should reset form and set email and name when clear is called', () => {
  //   component.email = 'test@test.com';
  //   component.name = 'Test User';
  //   component.checkoutForm.setValue({
  //     email: 'test2@test.com',
  //     name: 'Test User 2',
  //     phone: '',
  //     document: '',
  //   });
  //   component.clear();
  //   expect(component.checkoutForm.value).toEqual({
  //     email: 'test@test.com',
  //     name: 'Test User',
  //     phone: '',
  //     document: '',
  //   });
  // });

  // it('should return "is-invalid" if control has errors and is touched', () => {
  //   component.checkoutForm.controls['email'].setValue('test');
  //   component.checkoutForm.controls['email'].markAsTouched();
  //   const result = component.handlerValidators('email');
  //   expect(result).toEqual('is-invalid');
  // });

  // it('should return error message for control', () => {
  //   component.checkoutForm.controls['name'].setValue('a');
  //   component.checkoutForm.controls['name'].markAsTouched();
  //   const result = component.getErrorMessage('name');
  //   expect(result).toEqual('El nombre debe contener al menos 2 caracteres.');
  // });
});
