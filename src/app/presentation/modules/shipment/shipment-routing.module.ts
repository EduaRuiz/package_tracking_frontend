// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllShipmentsComponent } from './pages/all-shipments';

const routes: Routes = [
  {
    path: '',
    component: AllShipmentsComponent,
    //   children: [
    //     { path: 'register', component: 'RegisterShipmentComponent' },
    //     { path: 'update', component: 'UpdateShipmentComponent' },
    //     { path: '', redirectTo: '/index/sign-in', pathMatch: 'full' },
    //   ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentRoutingModule {}
