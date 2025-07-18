import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  @Input() width?: number;
  @Input() type?: 'submit' | 'reset' | 'button' = 'button';
  @Input() transparent?: boolean = false;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';
  @Input() light?: boolean = false;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
