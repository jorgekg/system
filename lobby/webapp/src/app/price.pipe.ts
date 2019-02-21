import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const replace = value.split(`.`);
    return replace[0] + (replace.length > 1 ? `,${replace[1]}` : ',00');
  }

}
