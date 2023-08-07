import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('./modules/questions/questions.module').then(
            (m) => m.QuestionsModule
          ),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./modules/tags/tags.module').then((m) => m.TagsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./modules/search/search.module').then((m) => m.SearchModule),
      },
      {
        path: '**',
        component: Error404Component,
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, Error404Component],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
