import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-wrapper',
  templateUrl: './input-wrapper.component.html',
})
export class InputWrapperComponent {
  @Input() isError: boolean = false;
  @Input() label?: string;
  @Input() controlId?: string;
  @Input() errorMessage?: string;
  @Input() btnIconName?: string;

  @Output() clickOnIcon = new EventEmitter<void>();

  get btnIcon(): IconName | undefined {
    return this.btnIconName as IconName;
  }

  onClick(): void {
    this.clickOnIcon.emit();
  }
}
