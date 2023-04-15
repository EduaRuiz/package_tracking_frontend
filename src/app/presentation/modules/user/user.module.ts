// Libraries
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Routing
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '@presentation/components';
import { UserDetailComponent, UserRoutingModule } from '.';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class UserModule {}
