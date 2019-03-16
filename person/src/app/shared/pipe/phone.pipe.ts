import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMaskPipe'
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phone: string): string {
    if (phone && phone.length >= 10) {
      const phoneArray = phone.split('');
      const mask = `(  )_    ${phoneArray.length > 10 ? ' ' : ''}_-_    `;
      return mask.split('').reduce((maskedValue, value) => {
        if (phoneArray && phoneArray.length > 0) {
          if (value.match(' ')) {
            return (maskedValue += phoneArray.shift());
          } else if (value.match('_')) {
            return (maskedValue += ' ');
          }
          return (maskedValue += value ? value : '');
        }
        return maskedValue;
      }, '');
    }
    return phone;
  }
}
