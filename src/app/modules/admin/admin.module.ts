import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AdminService } from './admin.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    SignupComponent,
    UsersComponent,
    PostsComponent,
    ChangepasswordComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, SharedModule],
  providers: [AdminService],
})
export class AdminModule {}
