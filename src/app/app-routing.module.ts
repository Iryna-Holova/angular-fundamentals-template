import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';
import { ROUTES } from '@shared/constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.COURSES,
    pathMatch: 'full',
  },
  {
    path: ROUTES.LOGIN,
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: ROUTES.REGISTER,
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('./features/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: ROUTES.COURSE_ADD,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./features/course-form/course-form.module').then(
        (m) => m.CourseFormModule
      ),
  },
  {
    path: `${ROUTES.COURSE_EDIT}/:id`,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./features/course-form/course-form.module').then(
        (m) => m.CourseFormModule
      ),
  },
  {
    path: `${ROUTES.COURSE_INFO}/:id`,
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/course-info/course-info.module').then(
        (m) => m.CourseInfoModule
      ),
  },
  {
    path: ROUTES.COURSES,
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: '**',
    redirectTo: ROUTES.COURSES,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
