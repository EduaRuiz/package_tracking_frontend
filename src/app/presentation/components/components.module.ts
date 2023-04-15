import { NgModule } from '@angular/core';
import { TypewriterComponent } from './typewriter';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar';
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IsoDatePipe } from './pipes';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    TypewriterComponent,
    NavbarComponent,
    ShipmentDetailComponent,
    IsoDatePipe,
    UserDetailComponent,
  ],
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  exports: [TypewriterComponent, NavbarComponent, ShipmentDetailComponent],
})
export class ComponentsModule {}
