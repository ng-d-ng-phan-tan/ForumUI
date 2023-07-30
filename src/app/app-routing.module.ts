import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'questions',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
  {
    path: 'tags',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/tags/tags.module').then((m) => m.TagsModule),
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  declarations: [HomeComponent, Error404Component],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
