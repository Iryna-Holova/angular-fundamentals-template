import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Course } from '@app/models/course.model';
import { TEXT } from '@shared/constants';
import { Author } from '@app/models/author.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit, OnDestroy {
  isAdmin$ = this.userStore.isAdmin$;
  courses: Course[] = [];
  authors: Author[] = [];
  readonly TEXT = TEXT;
  private subscription = new Subscription();

  constructor(
    private router: Router,
    private userStore: UserStoreService,
    private coursesStore: CoursesStoreService
  ) {}

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
    this.coursesStore.getAll().subscribe();
    this.coursesStore.getAllAuthors().subscribe();
  }

  onShowCourse(id: string): void {
    this.router.navigate(['/courses', id]);
  }

  onEditCourse(id: string): void {
    this.router.navigate(['/courses', 'edit', id]);
  }

  onDeleteCourse(id: string): void {
    this.coursesStore.deleteCourse(id).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
