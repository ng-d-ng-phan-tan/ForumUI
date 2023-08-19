import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { LayoutComponent } from './layout/layout.component';
import { Error404Component } from 'src/app/pages/error404/error404.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UserInfoComponent } from '../users/users/user-info/user-info.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'changepsw',
        component: ChangepasswordComponent,
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        // children: [
        //   {
        //     path: ':user_id',
        //     component: UserInfoComponent,
        //   },
        // ],
      },
      {
        path: 'users/:user_id',
        component: UserInfoComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
    ],
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
