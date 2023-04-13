// Libraries
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SharedGuard } from '@presentation/shared';
import { SignUpComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    canActivate: [SharedGuard],
    // canLoad: [SharedGuard],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      { path: '', redirectTo: '/index/sign-in', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
