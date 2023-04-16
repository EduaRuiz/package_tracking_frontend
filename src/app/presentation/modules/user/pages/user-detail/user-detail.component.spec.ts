import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail.component';
import { UserModel } from '@infrastructure/models';
import { PackageTrackingDelegate } from '@application/delegator';
import { NotificationService } from '@presentation/shared/services';
import { IsoDatePipe } from '@presentation/shared';
import { of, throwError } from 'rxjs';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userUC: PackageTrackingDelegate;
  let notificationService: NotificationService;

  const user: UserModel = {
    _id: '1',
    email: 'test test test',
    phone: '12545878',
    document: '54857565',
    name: 'test test test',
    firebaseId: 'test test test',
  };

  const userFormValues = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    document: user.document,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailComponent, IsoDatePipe],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: PackageTrackingDelegate,
          useValue: {
            execute: jest.fn().mockReturnValue(of(user)),
            toUpdateUser: jest.fn().mockReturnValue(of(user)),
            toGetUser: jest.fn().mockReturnValue(of(user)),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            showMessage: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // Arrange
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    component.user = user;
    userUC = TestBed.inject(PackageTrackingDelegate);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('edit', () => {
    it('should enable the phone and document controls', () => {
      // Act
      component.edit();

      // Assert
      expect(component.userForm.get('phone')?.enabled).toBe(true);
      expect(component.userForm.get('document')?.enabled).toBe(true);
    });
  });

  describe('save', () => {
    it('all be success', () => {
      // Arrange
      component.userForm.get('phone')?.enable();
      component.userForm.get('document')?.enable();
      component.userForm.patchValue({
        phone: '585485585',
        document: '584525478',
      });
      component.user.phone = 'old phone';
      component.user.document = 'old document';

      // Act
      component.save();

      // Assert
      expect(component.editing).toBe(false);
      expect(component.userForm.get('phone')?.disabled).toBe(true);
      expect(component.userForm.get('document')?.disabled).toBe(true);
      expect(userUC.toUpdateUser).toHaveBeenCalled();
    });

    it('should not call toUpdateUser and execute error ', () => {
      // Arrange
      component.userForm.get('phone')?.enable();
      component.userForm.get('document')?.enable();
      component.userForm.patchValue({
        phone: '585485585',
        document: '584525478',
      });
      component.user.phone = '585485585d';
      component.user.document = '584525478d';
      jest.spyOn(userUC, 'execute').mockReturnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
              statusText: 'Internal Server Error',
            })
        )
      );

      // Act
      component.save();

      // Assert
      expect(component.editing).toBe(false);
      expect(component.userForm.get('phone')?.disabled).toBe(true);
      expect(component.userForm.get('document')?.disabled).toBe(true);
      expect(userUC.toUpdateUser).toHaveBeenCalled();
    });

    it('all be success', () => {
      // Arrange
      component.userForm.get('phone')?.enable();
      component.userForm.get('document')?.enable();
      component.userForm.patchValue({
        phone: '585485585',
        document: '584525478',
      });
      component.user.phone = 'old phone';
      component.user.document = 'old document';

      // Act
      component.save();

      // Assert
      expect(component.editing).toBe(false);
      expect(component.userForm.get('phone')?.disabled).toBe(true);
      expect(component.userForm.get('document')?.disabled).toBe(true);
      expect(userUC.toUpdateUser).toHaveBeenCalled();
    });

    it('should call notificationService.showMessage when userUC.execute fails', () => {
      // Arrange
      component.userForm.get('phone')?.enable();
      component.userForm.get('document')?.enable();
      const spyOnExecute = jest.spyOn(userUC, 'execute').mockReturnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
              statusText: 'Internal Server Error',
            })
        )
      );
      component.editing = true;
      component.userForm.patchValue({
        phone: 'new phone',
        document: 'new document',
      });

      // Act
      component.save();

      // Assert
      expect(spyOnExecute).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should disable the phone and document controls and reset their values to the user values', () => {
      // Arrange
      component.editing = true;
      component.userForm.patchValue({
        phone: 'new phone',
        document: 'new document',
      });

      // Act
      component.cancel();

      // Assert
      expect(component.editing).toBe(false);
      expect(component.userForm.get('phone')?.disabled).toBe(true);
      expect(component.userForm.get('document')?.disabled).toBe(true);
      expect(component.userForm.get('phone')?.value).toBe(user.phone);
      expect(component.userForm.get('document')?.value).toBe(user.document);
    });
  });

  describe('isInvalid', () => {
    it('should return true when the control is invalid and dirty', () => {
      // Arrange
      component.userForm.get('phone')?.enable();
      component.userForm.get('phone')?.setValue('4');
      component.userForm.get('phone')?.markAsDirty();

      // Act and Assert
      expect(component.isInvalid('phone')).toBe(true);
    });

    it('should return true when the control is invalid and touched', () => {
      // Assert
      component.userForm.get('phone')?.enable();
      component.userForm.get('phone')?.setValue('4');
      component.userForm.get('phone')?.markAsTouched();

      // Act and Assert
      expect(component.isInvalid('phone')).toBe(true);
    });

    it('should return false when the control is valid, pristine and untouched', () => {
      // Arrange
      component.userForm.get('phone')?.enable();

      // Act and Assert
      expect(component.isInvalid('phone')).toBe(false);
    });
  });

  describe('getInvalidClass', () => {
    it('should return "is-invalid" when the control is invalid, dirty or touched', () => {
      // Arrange
      component.isInvalid = jest.fn().mockReturnValue(true);
      component.userForm.get('phone')?.setValue('');
      component.userForm.get('phone')?.markAsDirty();

      // Act and Assert
      expect(component.getInvalidClass('phone')).toBe('is-invalid');
    });

    it('should return an empty string when the control is valid, pristine and untouched', () => {
      // Act and Assert
      expect(component.getInvalidClass('phone')).toBe('');
    });
  });

  describe('handleError', () => {
    it('should call notificationService.showMessage with the correct message', () => {
      // Arrange
      component.handleError(
        new HttpErrorResponse({
          error: { message: ['Error updating user'] },
        })
      );

      // Act and Assert
      expect(notificationService.showMessage).toHaveBeenCalledWith(
        'Error',
        'Error updating user',
        'error'
      );
    });
  });

  describe('handleSuccess', () => {
    it('should call notificationService.showMessage with the correct message', () => {
      // Act
      component.handleSuccess(user);

      // Assert
      expect(notificationService.showMessage).toHaveBeenCalledWith(
        'Success',
        'User updated!, test test test',
        'success'
      );
    });
  });
});
