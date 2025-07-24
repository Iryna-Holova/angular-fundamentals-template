import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

import {
  ButtonSize,
  ButtonType,
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_TYPE,
} from './button.config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: IconName;
  @Input() width?: number;
  @Input() type?: ButtonType = DEFAULT_BUTTON_TYPE;
  @Input() size?: ButtonSize = DEFAULT_BUTTON_SIZE;
  @Input() transparent?: boolean = false;
  @Input() light?: boolean = false;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
