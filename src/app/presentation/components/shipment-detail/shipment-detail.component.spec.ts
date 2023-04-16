import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ShipmentDetailComponent } from './shipment-detail.component';
import { ShipmentModel } from '@infrastructure/models';
import { of, throwError } from 'rxjs';
import { PackageTrackingDelegate } from '@application/delegator';
import { NotificationService } from '@presentation/shared/services';
import { IsoDatePipe } from '@presentation/shared';
import { TypewriterComponent } from '../typewriter';

describe('ShipmentDetailComponent', () => {
  let component: ShipmentDetailComponent;
  let fixture: ComponentFixture<ShipmentDetailComponent>;
  let updateShipmentUC: PackageTrackingDelegate;
  let notificationService: NotificationService;

  const shipment: ShipmentModel = {
    _id: '1',
    description: 'test',
    originAddress: 'test',
    destinationAddress: 'test',
    status: { name: 'test' } as any,
    user: { _id: '1', name: 'test' } as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const shipmentFormValues = {
    description: { value: shipment.description, disabled: true },
    originAddress: { value: shipment.originAddress, disabled: true },
    destinationAddress: { value: shipment.destinationAddress, disabled: true },
    status: { value: shipment.status.name, disabled: true },
    createdAt: { value: shipment.createdAt, disabled: true },
    updatedAt: { value: shipment.updatedAt, disabled: true },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmentDetailComponent, IsoDatePipe, TypewriterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: PackageTrackingDelegate,
          useValue: {
            execute: jest.fn(),
            toUpdateShipment: jest.fn(),
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
    fixture = TestBed.createComponent(ShipmentDetailComponent);
    component = fixture.componentInstance;
    component.shipment = shipment;
    updateShipmentUC = TestBed.inject(PackageTrackingDelegate);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   // it('should initialize the shipmentForm with the correct values', () => {
  //   //   expect(component.shipmentForm.value).toEqual(shipmentFormValues);
  //   // });
  // });

  describe('edit', () => {
    it('should enable the originAddress and destinationAddress controls', () => {
      component.edit();
      expect(component.shipmentForm.get('originAddress')?.enabled).toBe(true);
      expect(component.shipmentForm.get('destinationAddress')?.enabled).toBe(
        true
      );
    });
  });

  // describe('save', () => {
  //   // it('should disable the originAddress and destinationAddress controls and call updateShipmentUC.execute with the correct command when the form is valid and the originAddress or destinationAddress have changed', () => {
  //   //   const spyOnExecute = jest
  //   //     .spyOn(updateShipmentUC, 'execute')
  //   //     .mockReturnValue(of(shipment));
  //   //   component.editing = true;
  //   //   component.shipmentForm.patchValue({
  //   //     originAddress: 'new originAddress',
  //   //     destinationAddress: 'new destinationAddress',
  //   //   });
  //   //   component.save();
  //   //   expect(component.editing).toBe(true);
  //   //   expect(component.shipmentForm.get('originAddress')?.disabled).toBe(true);
  //   //   expect(component.shipmentForm.get('destinationAddress')?.disabled).toBe(
  //   //     true
  //   //   );
  //   //   expect(updateShipmentUC.toUpdateShipment).toHaveBeenCalled();
  //   //   expect(spyOnExecute).toHaveBeenCalledWith(
  //   //     {
  //   //       _id: shipment._id,
  //   //       originAddress: 'new originAddress',
  //   //       destinationAddress: 'new destinationAddress',
  //   //     },
  //   //     shipment._id
  //   //   );
  //   // });

  //   it('should not call updateShipmentUC.execute when the form is invalid', () => {
  //     const spyOnExecute = jest.spyOn(updateShipmentUC, 'execute');
  //     component.editing = true;
  //     component.shipmentForm.get('originAddress')?.setValue('');
  //     component.save();
  //     expect(spyOnExecute).not.toHaveBeenCalled();
  //   });

  //   it('should not call updateShipmentUC.execute when the originAddress and destinationAddress have not changed', () => {
  //     const spyOnExecute = jest.spyOn(updateShipmentUC, 'execute');
  //     component.editing = true;
  //     component.save();
  //     expect(spyOnExecute).not.toHaveBeenCalled();
  //   });

  //   // it('should handle the error when updateShipmentUC.execute throws an error', () => {
  //   //   const spyOnExecute = jest
  //   //     .spyOn(updateShipmentUC, 'execute')
  //   //     .mockReturnValue(throwError(new HttpErrorResponse({})));
  //   //   const spyOnHandleError = jest.spyOn(component, 'handleError');
  //   //   component.editing = true;
  //   //   component.shipmentForm.patchValue({
  //   //     originAddress: 'new originAddress',
  //   //     destinationAddress: 'new destinationAddress',
  //   //   });
  //   //   component.save();
  //   //   expect(spyOnHandleError).toHaveBeenCalled();
  //   // });
  // });

  describe('cancel', () => {
    it('should disable the originAddress and destinationAddress controls and reset their values to the shipment values', () => {
      component.editing = true;
      component.shipmentForm.patchValue({
        originAddress: 'new originAddress',
        destinationAddress: 'new destinationAddress',
      });
      component.cancel();
      expect(component.editing).toBe(false);
      expect(component.shipmentForm.get('originAddress')?.disabled).toBe(true);
      expect(component.shipmentForm.get('destinationAddress')?.disabled).toBe(
        true
      );
      expect(component.shipmentForm.get('originAddress')?.value).toBe(
        shipment.originAddress
      );
      expect(component.shipmentForm.get('destinationAddress')?.value).toBe(
        shipment.destinationAddress
      );
    });
  });

  // describe('isInvalid', () => {
  //   //   it('should return true when the control is invalid, dirty or touched', () => {
  //   //     component.shipmentForm.get('originAddress')?.setValue(undefined);
  //   //     component.shipmentForm.get('originAddress')?.markAsDirty();
  //   //     console.log(component.shipmentForm.get('originAddress')?.errors);
  //   //     expect(component.isInvalid('originAddress')).toBe(true);
  //   //   });

  //   it('should return false when the control is valid, pristine and untouched', () => {
  //     // Assert
  //     expect(component.isInvalid('originAddress')).toBe(false);
  //   });
  // });

  describe('getInvalidClass', () => {
    it('should return "is-invalid" when the control is invalid, dirty or touched', () => {
      // Act
      component.isInvalid = jest.fn().mockReturnValue(true);
      component.shipmentForm.get('originAddress')?.setValue('');
      component.shipmentForm.get('originAddress')?.markAsDirty();

      // Assert
      expect(component.getInvalidClass('originAddress')).toBe('is-invalid');
    });

    it('should return an empty string when the control is valid, pristine and untouched', () => {
      expect(component.getInvalidClass('originAddress')).toBe('');
    });
  });

  describe('handleError', () => {
    it('should call notificationService.showMessage with the correct message', () => {
      // Act
      component.handleError(
        new HttpErrorResponse({
          error: { message: ['Error updating shipment'] },
        })
      );

      // Assert
      expect(notificationService.showMessage).toHaveBeenCalledWith(
        'Error',
        'Error updating shipment',
        'error'
      );
    });
  });

  describe('handleSuccess', () => {
    it('should call notificationService.showMessage with the correct message', () => {
      // Act
      component.handleSuccess(shipment);

      // Assert
      expect(notificationService.showMessage).toHaveBeenCalledWith(
        'Success',
        'Shipment updated!, Id: ' + shipment._id,
        'success'
      );
    });
  });
});
