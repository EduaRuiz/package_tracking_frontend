// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllShipmentsComponent } from './pages/all-shipments';
import { NewShipmentComponent } from './pages/new-shipment';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AllShipmentsComponent },
      { path: 'register', component: NewShipmentComponent },
      //     { path: 'update', component: 'UpdateShipmentComponent' },
      //     { path: '', redirectTo: '/index/sign-in', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentRoutingModule {}
