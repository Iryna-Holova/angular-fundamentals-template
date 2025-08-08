import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string, format: 'ui' | 'time' | 'db' = 'ui'): string {
    let date: Date;

    if (typeof value === 'string') {
      const parts = value.split('/');
      if (parts.length === 3 && parts[0].length === 2) {
        const [day, month, year] = parts.map(Number);
        date = new Date(year, month - 1, day);
      } else {
        date = new Date(value);
      }
    } else {
      date = value;
    }

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
