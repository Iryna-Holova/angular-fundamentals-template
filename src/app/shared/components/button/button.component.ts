import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far, IconName } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  @Input() width?: number;
  @Input() type?: 'submit' | 'reset' | 'button' = 'button';

  constructor(library: FaIconLibrary) {
    library.addIconPacks(far);
  }
}
