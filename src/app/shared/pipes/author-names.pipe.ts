import { Pipe, PipeTransform } from '@angular/core';
import { mockedAuthorsList as AUTHORS } from '@shared/mocks/mock';

@Pipe({
  name: 'authorNames',
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authorIds: string[]): string {
    return authorIds
      .map((id) => AUTHORS.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  }
}
