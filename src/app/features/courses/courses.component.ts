import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';

import { Author, Course } from '@shared/types/courses.types';
import { TEXT, ROUTES } from '@shared/constants';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly userStore = inject(UserStoreService);
  private readonly coursesStore = inject(CoursesStoreService);

  private readonly subscription = new Subscription();

  readonly isAdmin = this.userStore.isAdmin;
  readonly TEXT = TEXT;
  readonly ROUTES = ROUTES;

  courses: Course[] = [];
  authors: Author[] = [];

  ngOnInit(): void {
    this.subscription.add(
      this.coursesStore.courses$.subscribe((courses) => {
        this.courses = courses;
      })
    );
    this.subscription.add(
      this.coursesStore.authors$.subscribe((authors) => {
        this.authors = authors;
      })
    );

    this.subscription.add(this.coursesStore.getAll().subscribe());
    this.subscription.add(this.coursesStore.getAllAuthors().subscribe());
  }

  onSearchCourses(query: string): void {
    this.subscription.add(this.coursesStore.filterCourses(query).subscribe());
  }

  onShowCourse(id: string): void {
    this.router.navigate([this.ROUTES.COURSE_INFO, id]);
  }

  onEditCourse(id: string): void {
    this.router.navigate([this.ROUTES.COURSE_EDIT, id]);
  }

  onDeleteCourse(id: string): void {
    this.subscription.add(this.coursesStore.deleteCourse(id).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
