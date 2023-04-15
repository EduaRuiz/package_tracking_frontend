import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageTrackingDelegate } from '@application/delegator';
import { NewShipmentCommand } from '@infrastructure/commands';
import { NotificationService } from '@presentation/shared/services';

@Component({
  selector: 'app-new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss'],
})
export class NewShipmentComponent implements OnInit {
  shipmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly newShipmentUC: PackageTrackingDelegate,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.shipmentForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(10)]],
      originAddress: ['', [Validators.required, Validators.minLength(10)]],
      destinationAddress: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.shipmentForm.get(controlName);
    return !!control?.invalid && (control?.dirty || control?.touched);
  }

  getInvalidClass(controlName: string): string {
    return this.isInvalid(controlName) ? 'is-invalid' : '';
  }

  onSubmit(): void {
    const shipment = <NewShipmentCommand>this.shipmentForm.value;
    this.newShipmentUC.toRegisterNewShipment();
    this.shipmentForm.valid &&
      this.newShipmentUC.execute(shipment).subscribe({
        next: () => this.handleSuccess(),
        error: (error: HttpErrorResponse) => this.handleError(error),
        complete: () => this.shipmentForm.reset(),
      });
  }

  cancel(): void {
    this.router.navigate(['dashboard']);
  }

  handleError(error: HttpErrorResponse) {
    this.notificationService.showMessage('Error', error.error.message, 'error');
  }

  handleSuccess() {
    this.notificationService.showMessage(
      'Success',
      'Shipment created successfully',
      'success'
    );
  }
}
