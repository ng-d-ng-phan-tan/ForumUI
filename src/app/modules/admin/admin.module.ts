import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    SignupComponent,
    UsersComponent,
    PostsComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
