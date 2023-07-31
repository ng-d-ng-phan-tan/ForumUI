import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
