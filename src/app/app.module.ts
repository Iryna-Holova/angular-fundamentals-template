import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { CoursesModule } from '@app/features/courses/courses.module';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { DurationPipe } from '@shared/pipes/duration.pipe';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent],
  imports: [BrowserModule, SharedModule, CoursesModule, FontAwesomeModule],
  providers: [
    AuthorizedGuard,
    NotAuthorizedGuard,
    CoursesService,
    CoursesStoreService,
    DurationPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
