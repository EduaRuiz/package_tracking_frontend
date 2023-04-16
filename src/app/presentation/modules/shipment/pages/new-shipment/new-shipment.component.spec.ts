import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { NewShipmentComponent } from './new-shipment.component';
import { PackageTrackingDelegate } from '@application/delegator';
import { NotificationService } from '@presentation/shared/services';
import { Router } from '@angular/router';
import { NewShipmentCommand } from '@infrastructure/commands';

describe('NewShipmentComponent', () => {
  let component: NewShipmentComponent;
  let fixture: ComponentFixture<NewShipmentComponent>;
  let packageTrackingDelegate: PackageTrackingDelegate;

  const routerMock = {
    navigate: jest.fn(),
  };

  const notificationServiceMock = {
    showMessage: jest.fn(),
  };

  const packageTrackingDelegateMock = {
    toRegisterNewShipment: jest.fn(),
    execute: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewShipmentComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        {
          provide: PackageTrackingDelegate,
          useValue: packageTrackingDelegateMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShipmentComponent);
    component = fixture.componentInstance;
    packageTrackingDelegate = TestBed.inject(PackageTrackingDelegate);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create shipmentForm', () => {
      // Arrange
      const shipment = new NewShipmentCommand();
      shipment.description = 'Test description';
      shipment.originAddress = 'Test origin address';
      shipment.destinationAddress = 'Test destination address';

      // Act
      component.ngOnInit();

      // Assert
      expect(component.shipmentForm).toBeTruthy();
      expect(component.shipmentForm.valid).toBeFalsy();
      expect(component.shipmentForm.touched).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    it('should call packageTrackingDelegate execute method and handle success', () => {
      // Arrange
      const shipment = new NewShipmentCommand();
      shipment.description = 'Test description';
      shipment.originAddress = 'Test origin address';
      shipment.destinationAddress = 'Test destination address';
      const executeSpy = jest
        .spyOn(packageTrackingDelegate, 'execute')
        .mockReturnValue(of(undefined));
      const handleSuccessSpy = jest.spyOn(component, 'handleSuccess');

      // Act
      component.ngOnInit();
      component.shipmentForm.patchValue(shipment);
      component.onSubmit();
      component.shipmentForm.get('description')?.setValue(shipment.description);
      component.shipmentForm
        .get('originAddress')
        ?.setValue(shipment.originAddress);
      component.shipmentForm
        .get('destinationAddress')
        ?.setValue(shipment.destinationAddress);
      component.shipmentForm.markAllAsTouched();

      // Assert
      expect(packageTrackingDelegate.toRegisterNewShipment).toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalledWith(shipment);
      expect(handleSuccessSpy).toHaveBeenCalled();
      expect(component.shipmentForm.valid).toBeTruthy();
      expect(component.shipmentForm.touched).toBeTruthy();
    });

    it('should call packageTrackingDelegate execute method and handle error', () => {
      // Arrange
      const shipment = new NewShipmentCommand();
      shipment.description = 'Test description';
      shipment.originAddress = 'Test origin address';
      shipment.destinationAddress = 'Test destination address';
      const error = new HttpErrorResponse({
        status: 400,
        statusText: 'Bad Request',
      });
      const executeSpy = jest
        .spyOn(packageTrackingDelegate, 'execute')
        .mockReturnValue(throwError(() => error));
      const handleErrorSpy = jest.spyOn(component, 'handleError');

      // Act
      component.ngOnInit();
      component.shipmentForm.patchValue(shipment);
      component.onSubmit();
      component.shipmentForm.get('description')?.setValue(shipment.description);
      component.shipmentForm
        .get('originAddress')
        ?.setValue(shipment.originAddress);
      component.shipmentForm
        .get('destinationAddress')
        ?.setValue(shipment.destinationAddress);
      component.shipmentForm.markAllAsTouched();

      // Assert
      expect(packageTrackingDelegate.toRegisterNewShipment).toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalledWith(shipment);
      expect(handleErrorSpy).toHaveBeenCalled();
      expect(component.shipmentForm.valid).toBeTruthy();
      expect(component.shipmentForm.touched).toBeTruthy();
    });
  });

  describe('handleSuccess', () => {
    it('should call router navigate method', () => {
      // Arrange
      const shipment = new NewShipmentCommand();
      shipment.description = 'Test description';
      shipment.originAddress = 'Test origin address';
      shipment.destinationAddress = 'Test destination address';
      const executeSpy = jest
        .spyOn(packageTrackingDelegate, 'execute')
        .mockReturnValue(of(undefined));
      const handleSuccessSpy = jest.spyOn(component, 'handleSuccess');

      // Act
      component.ngOnInit();
      component.shipmentForm.patchValue(shipment);
      component.onSubmit();
      component.shipmentForm.get('description')?.setValue(shipment.description);
      component.shipmentForm
        .get('originAddress')
        ?.setValue(shipment.originAddress);
      component.shipmentForm
        .get('destinationAddress')
        ?.setValue(shipment.destinationAddress);
      component.shipmentForm.markAllAsTouched();

      // Assert
      expect(packageTrackingDelegate.toRegisterNewShipment).toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalledWith(shipment);
      expect(handleSuccessSpy).toHaveBeenCalled();
      expect(component.shipmentForm.valid).toBeTruthy();
      expect(component.shipmentForm.touched).toBeTruthy();
    });
  });

  describe('isInvalid', () => {
    it('should return true when the control is invalid and dirty', () => {
      // Arrange
      component.ngOnInit();
      component.shipmentForm.get('originAddress')?.setValue('4');
      component.shipmentForm.get('originAddress')?.markAsDirty();

      // Act and Assert
      expect(component.isInvalid('originAddress')).toBe(true);
    });

    it('should return true when the control is invalid and touched', () => {
      // Assert
      component.ngOnInit();
      component.shipmentForm.get('originAddress')?.setValue('4');
      component.shipmentForm.get('originAddress')?.markAsTouched();

      // Act and Assert
      expect(component.isInvalid('originAddress')).toBe(true);
    });

    it('should return false when the control is valid, pristine and untouched', () => {
      // Arrange
      component.ngOnInit();
      component.shipmentForm.get('originAddress')?.enable();

      // Act and Assert
      expect(component.isInvalid('originAddress')).toBe(false);
    });
  });

  describe('cancel', () => {
    it('should call router navigate method', () => {
      // Arrange
      const navigateSpy = jest.spyOn(routerMock, 'navigate');

      // Act
      component.cancel();

      // Assert
      expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
    });
  });

  describe('getInvalidClass', () => {
    it('should return "is-invalid" when the control is invalid, dirty or touched', () => {
      // Act
      component.ngOnInit();

      // Arrange
      component.isInvalid = jest.fn().mockReturnValue(true);
      component.shipmentForm.get('originAddress')?.setValue('');
      component.shipmentForm.get('originAddress')?.markAsDirty();

      // Act and Assert
      expect(component.getInvalidClass('originAddress')).toBe('is-invalid');
    });

    it('should return an empty string when the control is valid, pristine and untouched', () => {
      // Act
      component.ngOnInit();

      // Assert
      expect(component.getInvalidClass('originAddress')).toBe('');
    });
  });
});
