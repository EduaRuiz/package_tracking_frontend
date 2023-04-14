import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IsoDatePipe } from './pipes';

@NgModule({
  declarations: [IsoDatePipe],
  imports: [CommonModule],
  exports: [IsoDatePipe],
})
export class SharedModule {}
