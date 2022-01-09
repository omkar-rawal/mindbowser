import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizename'
})
export class CapitalizenamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
