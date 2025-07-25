import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Author } from '@app/models/author.model';

import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { TEXT } from '@shared/constants';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
})
export class CourseInfoComponent {
  readonly TEXT = TEXT;
  course$!: Observable<Course>;
  id!: string;
  authors$!: Observable<Author[]>;

  constructor(
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.course$ = this.coursesStore
      .getCourse(this.id)
      .pipe(map((response) => response.result));
    this.authors$ = this.coursesStore.authors$;
    this.coursesStore.getAllAuthors().subscribe();
  }
}
