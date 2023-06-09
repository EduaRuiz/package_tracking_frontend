// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Routing
import { SecurityRoutingModule } from './security-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@presentation/components';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class SecurityModule {}
