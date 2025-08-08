import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BUTTON_TEXT } from '@app/shared/constants/text.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Input() placeholder: string = 'Input text';
  @Output() search = new EventEmitter<string>();

  searchValue: string = '';

  readonly BUTTON_TEXT = BUTTON_TEXT;

  onSearch(): void {
    this.search.emit(this.searchValue);
  }
}
