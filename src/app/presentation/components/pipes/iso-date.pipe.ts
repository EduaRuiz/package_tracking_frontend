import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'isoDate',
})
export class IsoDatePipe implements PipeTransform {
  transform(value: string): string {
    const datePipe = new DatePipe('en-US');
    try {
      const date = new Date(value);
      const result = datePipe.transform(date, 'medium');
      return result ?? '';
    } catch (error) {
      return '';
    }
  }
}
