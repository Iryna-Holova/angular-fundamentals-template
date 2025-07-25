import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () =>
      import('./features/registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: 'courses/add',
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./features/course-form/course-form.module').then(
        (m) => m.CourseFormModule
      ),
  },
  {
    path: 'courses/edit/:id',
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./features/course-form/course-form.module').then(
        (m) => m.CourseFormModule
      ),
  },
  {
    path: 'courses/:id',
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/course-info/course-info.module').then(
        (m) => m.CourseInfoModule
      ),
  },
  {
    path: 'courses',
    canLoad: [AuthorizedGuard],
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: '**',
    redirectTo: '/courses',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
