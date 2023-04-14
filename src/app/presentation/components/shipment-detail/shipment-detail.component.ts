import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageTrackingDelegate } from '@application/delegator';
import { ShipmentModel } from '@infrastructure/models';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.scss'],
})
export class ShipmentDetailComponent implements OnInit {
  shipmentForm!: FormGroup;
  editing = false;
  @Input() shipment: ShipmentModel = {
    originAddress: '',
    destinationAddress: '',
    status: { name: '' },
    createdAt: '',
    updatedAt: '',
  } as unknown as ShipmentModel;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly updateShipmentUC: PackageTrackingDelegate
  ) {}

  ngOnInit(): void {
    this.shipmentForm = this.formBuilder.group({
      description: [
        { value: this.shipment.description, disabled: true },
        Validators.required,
      ],
      originAddress: [
        { value: this.shipment.originAddress, disabled: !this.editing },
        Validators.required,
      ],
      destinationAddress: [
        { value: this.shipment.destinationAddress, disabled: !this.editing },
        Validators.required,
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
}
