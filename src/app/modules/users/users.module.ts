import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AvatarsComponent } from './avatars/avatars.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UserInfoComponent, AvatarsComponent, UsersComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, FormsModule],
})
export class UsersModule {}
