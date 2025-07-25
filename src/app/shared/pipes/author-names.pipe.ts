import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '@app/models/author.model';

@Pipe({
  name: 'authorNames',
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authorIds: string[], authorsList: Author[]): string {
    const authorsMap = new Map(authorsList.map((a) => [a.id, a.name]));
    return authorIds
      .map((id) => authorsMap.get(id))
      .filter(Boolean)
      .join(', ');
  }
}
