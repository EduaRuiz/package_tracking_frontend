import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string | number, type?: 'phone' | 'telephone', separator?: string): string {
    const len = value.toString().length
    switch (len) {
      case 7: type = 'phone'
        break
      case 10: type = 'telephone'
        break
      default: type = undefined
    }
    if (type === 'phone') {
      return value.toString().slice(0, 3) + (separator || '') + value.toString().slice(3);
    } else if (type === 'telephone') {
      return value.toString().slice(0, 3) + (separator || '') + value.toString().slice(3, 7) + (separator || '') + value.toString().slice(7);
    }
    return value.toString();
  }
}
