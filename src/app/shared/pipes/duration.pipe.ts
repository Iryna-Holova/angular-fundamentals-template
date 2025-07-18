import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number): [time: string, suffix: string] {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hh = hours < 10 ? '0' + hours : String(hours);
    const mm = minutes < 10 ? '0' + minutes : String(minutes);
    const suffix = hours === 1 ? 'hour' : 'hours';

    return [`${hh}:${mm}`, suffix];
  }
}
