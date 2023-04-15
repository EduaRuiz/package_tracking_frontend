import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageTrackingDelegate } from '@application/delegator';
import { ShipmentModel } from '@infrastructure/models';
import { NotificationService } from '@presentation/shared/services';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.scss'],
})
export class ShipmentDetailComponent implements OnInit {
  shipmentForm!: FormGroup;
  editing = false;
  @Input() shipment: ShipmentModel = {
    _id: '',
    originAddress: '',
    destinationAddress: '',
    status: { name: '' },
    createdAt: '',
    updatedAt: '',
  } as unknown as ShipmentModel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly updateShipmentUC: PackageTrackingDelegate,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.shipmentForm = this.formBuilder.group({
      description: [
        { value: this.shipment.description, disabled: true },
        [Validators.required, Validators.minLength(10)],
      ],
      originAddress: [
        { value: this.shipment.originAddress, disabled: !this.editing },
        [Validators.required, Validators.minLength(10)],
      ],
      destinationAddress: [
        { value: this.shipment.destinationAddress, disabled: !this.editing },
        [Validators.required, Validators.minLength(10)],
      ],
      status: [{ value: this.shipment.status.name, disabled: true }],
      createdAt: [{ value: this.shipment.createdAt, disabled: true }],
      updatedAt: [{ value: this.shipment.updatedAt, disabled: true }],
    });
  }

  edit() {
    this.editing = true;
    this.shipmentForm.get('originAddress')?.enable();
    this.shipmentForm.get('destinationAddress')?.enable();
  }

  save() {
    this.editing = false;
    this.shipmentForm.get('originAddress')?.disable();
    this.shipmentForm.get('destinationAddress')?.disable();
    this.updateShipmentUC.toUpdateShipment();
    const updateShipmentCommand = {
      _id: this.shipment._id,
      originAddress: this.shipmentForm.get('originAddress')?.value,
      destinationAddress: this.shipmentForm.get('destinationAddress')?.value,
    };
    this.updateShipmentUC
      .execute<ShipmentModel>(updateShipmentCommand, updateShipmentCommand._id)
      .subscribe({
        next: (shipment: ShipmentModel) => {
          this.handleSuccess(shipment);
        },
        error: (error) => this.handleError(error),
      });
  }

  cancel() {
    this.editing = false;
    this.shipmentForm.get('originAddress')?.disable();
    this.shipmentForm.get('destinationAddress')?.disable();
    this.shipmentForm
      .get('originAddress')
      ?.setValue(this.shipment.originAddress);
    this.shipmentForm
      .get('destinationAddress')
      ?.setValue(this.shipment.destinationAddress);
  }

  isInvalid(controlName: string): boolean {
    const control = this.shipmentForm.get(controlName);
    return !!control?.invalid && (control?.dirty || control?.touched);
  }

  getInvalidClass(controlName: string): string {
    return this.isInvalid(controlName) ? 'is-invalid' : '';
  }

  handleError(error: HttpErrorResponse): void {
    this.notificationService.showMessage('Error', error.error.message, 'error');
  }

  handleSuccess(shipment: ShipmentModel): void {
    this.notificationService.showMessage(
      'Success',
      `Shipment updated!, Id: ${shipment._id}`,
      'success'
    );
  }
}
