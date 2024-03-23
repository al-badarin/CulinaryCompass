import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {
  transform(value: string, maxCharCount = 10): string {
    return `${value.substring(0, maxCharCount)}${
      value.length > maxCharCount ? '...' : ''
    }`;
  }
}
