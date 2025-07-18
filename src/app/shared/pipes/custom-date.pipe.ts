import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string, format: 'ui' | 'time' | 'db' = 'ui'): string {
    const date = typeof value === 'string' ? new Date(value) : value;

    const pad = (n: number) => n.toString().padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();

    switch (format) {
      case 'time':
        return `${year}-${month}-${day}`; // yyyy-MM-dd
      case 'db':
        return `${month}/${day}/${year}`; // MM/dd/yyyy
      default:
        return `${day}.${month}.${year}`; // dd.MM.yyyy
    }
  }
}
