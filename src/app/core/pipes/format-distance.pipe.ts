import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'formatDistance',
})
export class FormatDistancePipe implements PipeTransform {
  transform(date: Date | number, baseDate: Date | number): string {
    if (!date || !baseDate) {
      return '';
    }
    return formatDistance(date, baseDate);
  }
}
