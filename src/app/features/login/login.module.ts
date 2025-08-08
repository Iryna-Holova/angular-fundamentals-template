import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [CommonModule, FormsModule, SharedModule, LoginRoutingModule],
})
export class LoginModule {}
