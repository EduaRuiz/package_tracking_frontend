import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PhoneNumberPipe, RelativeTimePipe } from './pipes';

@NgModule({
  declarations: [PhoneNumberPipe, RelativeTimePipe],
  imports: [CommonModule, FormsModule],
  exports: [PhoneNumberPipe, RelativeTimePipe],
})
export class SharedModule {}
