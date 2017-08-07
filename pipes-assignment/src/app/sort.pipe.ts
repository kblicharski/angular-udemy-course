import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Server[]): Server[] {
    return value.sort((a, b) => a.name > b.name ? 1 : (b.name > a.name) ? -1 : 0);
  }

}

interface Server {
  instanceType: string,
  name: string,
  status: string,
  started: Date
}
