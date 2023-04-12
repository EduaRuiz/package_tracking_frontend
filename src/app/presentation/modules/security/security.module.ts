// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Routing
import { SecurityRoutingModule } from './security-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [CommonModule, SecurityRoutingModule],
})
export class SecurityModule {}
