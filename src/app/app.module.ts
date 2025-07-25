import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@app/app.component';
import { SharedModule } from '@shared/shared.module';

import { SessionStorageService } from './auth/services/session-storage.service';
import { AuthService } from './auth/services/auth.service';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserService } from './user/services/user.service';
import { UserStoreService } from './user/services/user-store.service';

import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedModule],
  providers: [
    SessionStorageService,
    AuthService,
    CoursesService,
    CoursesStoreService,
    UserService,
    UserStoreService,
    AuthorizedGuard,
    NotAuthorizedGuard,
    AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
