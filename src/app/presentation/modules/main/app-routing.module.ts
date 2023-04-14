import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard';
import { AuthGuard, SharedGuard } from '@presentation/shared';

const routes: Routes = [
  {
    path: 'index',
    canActivate: [SharedGuard],
    loadChildren: () =>
      import('../security/security.module').then((m) => m.SecurityModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../shipment/shipment.module').then((m) => m.ShipmentModule),
  },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: 'index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
