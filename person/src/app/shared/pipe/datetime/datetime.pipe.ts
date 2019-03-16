import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return moment(value).format('DD/MM/YYYY HH:mm');
    }
    return ``;
  }

}
