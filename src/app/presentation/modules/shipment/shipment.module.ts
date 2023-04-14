// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Routing
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@presentation/components';
import { ShipmentRoutingModule } from '.';
import { AllShipmentsComponent } from './pages/all-shipments/all-shipments.component';
import { NewShipmentComponent } from './pages/new-shipment/new-shipment.component';

@NgModule({
  declarations: [
    AllShipmentsComponent,
    NewShipmentComponent
  ],
  imports: [
    ShipmentRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class ShipmentModule {}
