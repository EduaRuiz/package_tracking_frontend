import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ShipmentDetailComponent } from './shipment-detail.component';
import { ShipmentModel } from '@infrastructure/models';
import { PackageTrackingDelegate } from '@application/delegator';
import { NotificationService } from '@presentation/shared/services';
import { IsoDatePipe } from '@presentation/shared';
import { TypewriterComponent } from '../typewriter';
import { of, throwError } from 'rxjs';

describe('ShipmentDetailComponent', () => {
  let component: ShipmentDetailComponent;
  let fixture: ComponentFixture<ShipmentDetailComponent>;
  let updateShipmentUC: PackageTrackingDelegate;
  let notificationService: NotificationService;

  const shipment: ShipmentModel = {
    _id: '1',
    description: 'test test test',
    originAddress: 'test test test',
    destinationAddress: 'test test test',
    status: { name: 'test' } as any,
    user: { _id: '1', name: 'test' } as any,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const shipmentFormValues = {
    description: shipment.description,
    originAddress: shipment.originAddress,
    destinationAddress: shipment.destinationAddress,
    status: shipment.status.name,
    createdAt: shipment.createdAt,
    updatedAt: shipment.updatedAt,
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
    // Arrange
    fixture = TestBed.createComponent(ShipmentDetailComponent);
    component = fixture.componentInstance;
    component.shipment = shipment;
    updateShipmentUC = TestBed.inject(PackageTrackingDelegate);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the shipmentForm with the correct values', () => {
      // Act & Assert
      expect(component.shipmentForm.value).toEqual(shipmentFormValues);
    });
  });

  describe('edit', () => {
    it('should enable the originAddress and destinationAddress controls', () => {
      // Act
      component.edit();

      // Assert
      expect(component.shipmentForm.get('originAddress')?.enabled).toBe(true);
      expect(component.shipmentForm.get('destinationAddress')?.enabled).toBe(
        true
      );
    });
  });

  describe('save', () => {
    it('all be success', () => {
      // Arrange
      component.shipmentForm.get('originAddress')?.enable();
      component.shipmentForm.get('destinationAddress')?.enable();
      const spyOnExecute = jest
        .spyOn(updateShipmentUC, 'execute')
        .mockReturnValue(of(shipment));
      component.editing = true;
      component.shipmentForm.patchValue({
        originAddress: 'new originAddress',
        destinationAddress: 'new destinationAddress',
      });

      // Act
      component.save();

      // Assert
      expect(component.editing).toBe(false);
      expect(component.shipmentForm.get('originAddress')?.disabled).toBe(true);
      expect(component.shipmentForm.get('destinationAddress')?.disabled).toBe(
        true
      );
      expect(updateShipmentUC.toUpdateShipment).toHaveBeenCalled();
      expect(spyOnExecute).toHaveBeenCalledWith(
        {
          _id: shipment._id,
          originAddress: 'new originAddress',
          destinationAddress: 'new destinationAddress',
        },
        shipment._id
      );
    });

    it('should not call toUpdateShipment ', () => {
      // Arrange
      component.shipmentForm.get('originAddress')?.enable();
      component.shipmentForm.get('destinationAddress')?.enable();
      const spyOnExecute = jest
        .spyOn(updateShipmentUC, 'execute')
        .mockReturnValue(of(shipment));
      component.editing = true;

      // Act
      component.save();

      // Assert
      expect(component.editing).toBe(false);
      expect(component.shipmentForm.get('originAddress')?.disabled).toBe(true);
      expect(component.shipmentForm.get('destinationAddress')?.disabled).toBe(
        true
      );
      expect(updateShipmentUC.toUpdateShipment).not.toHaveBeenCalled();
      expect(spyOnExecute).not.toHaveBeenCalled();
    });

    it('should call notificationService.showMessage when updateShipmentUC.execute fails', () => {
      // Arrange
      component.shipmentForm.get('originAddress')?.enable();
      component.shipmentForm.get('destinationAddress')?.enable();
      const spyOnExecute = jest
        .spyOn(updateShipmentUC, 'execute')
        .mockReturnValue(
          throwError(
            () =>
              new HttpErrorResponse({
                status: 500,
                statusText: 'Internal Server Error',
              })
          )
        );
      const spyOnShowMessage = jest.spyOn(notificationService, 'showMessage');
      component.editing = true;
      component.shipmentForm.patchValue({
        originAddress: 'new originAddress',
        destinationAddress: 'new destinationAddress',
      });

      // Act
      component.save();

      // Assert
      expect(spyOnExecute).toHaveBeenCalled();
    });

    it('should not call updateShipmentUC.execute when the form is invalid', () => {
      // Arrange
      const spyOnExecute = jest.spyOn(updateShipmentUC, 'execute');
      component.editing = true;
      component.shipmentForm.get('originAddress')?.setValue('');

      // Act
      component.save();

      // Assert
      expect(spyOnExecute).not.toHaveBeenCalled();
    });

    it('should not call updateShipmentUC.execute when the originAddress and destinationAddress have not changed', () => {
      // Arrange
      const spyOnExecute = jest.spyOn(updateShipmentUC, 'execute');

      // Act
      component.editing = true;
      component.save();

      // Assert
      expect(spyOnExecute).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should disable the originAddress and destinationAddress controls and reset their values to the shipment values', () => {
      // Arrange
      component.editing = true;
      component.shipmentForm.patchValue({
        originAddress: 'new originAddress',
        destinationAddress: 'new destinationAddress',
      });

      // Act
      component.cancel();

      // Assert
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

  describe('isInvalid', () => {
    it('should return true when the control is invalid and dirty', () => {
      // Arrange
      component.shipmentForm.get('originAddress')?.enable();
      component.shipmentForm.get('originAddress')?.setValue('4');
      component.shipmentForm.get('originAddress')?.markAsDirty();

      // Act and Assert
      expect(component.isInvalid('originAddress')).toBe(true);
    });

    it('should return true when the control is invalid and touched', () => {
      // Assert
      component.shipmentForm.get('originAddress')?.enable();
      component.shipmentForm.get('originAddress')?.setValue('4');
      component.shipmentForm.get('originAddress')?.markAsTouched();

      // Act and Assert
      expect(component.isInvalid('originAddress')).toBe(true);
    });

    it('should return false when the control is valid, pristine and untouched', () => {
      // Arrange
      component.shipmentForm.get('originAddress')?.enable();

      // Act and Assert
      expect(component.isInvalid('originAddress')).toBe(false);
    });
  });

  describe('getInvalidClass', () => {
    it('should return "is-invalid" when the control is invalid, dirty or touched', () => {
      // Arrange
      component.isInvalid = jest.fn().mockReturnValue(true);
      component.shipmentForm.get('originAddress')?.setValue('');
      component.shipmentForm.get('originAddress')?.markAsDirty();

      // Act and Assert
      expect(component.getInvalidClass('originAddress')).toBe('is-invalid');
    });

    it('should return an empty string when the control is valid, pristine and untouched', () => {
      // Act and Assert
      expect(component.getInvalidClass('originAddress')).toBe('');
    });
  });

  describe('handleError', () => {
    it('should call notificationService.showMessage with the correct message', () => {
      // Arrange
      component.handleError(
        new HttpErrorResponse({
          error: { message: ['Error updating shipment'] },
        })
      );

      // Act and Assert
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
