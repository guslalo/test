import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let id = value;
    let splitedId = id.match(/.{1,5}/g);
    return splitedId.join('-');
  }

}
