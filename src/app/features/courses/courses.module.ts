import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { SearchComponent } from './search/search.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CoursesListComponent,
    SearchComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, CoursesRoutingModule],
})
export class CoursesModule {}
