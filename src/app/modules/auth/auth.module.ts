import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisResetpasswordComponent } from './regis-resetpassword/regis-resetpassword.component';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';
@NgModule({
  // providers: [
  //   { provide: 'apiURL', useValue: 'https://localhost' } 
  // ],
  declarations: [LoginComponent, SignupComponent, AuthComponent, ChangepasswordComponent, ResetpasswordComponent, RegisResetpasswordComponent, ActivateaccountComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
})
export class AuthModule {}
