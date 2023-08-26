import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup/signup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisResetpasswordComponent } from './regis-resetpassword/regis-resetpassword.component';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { returnUrl: window.location.pathname, noReuse: true },
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: { returnUrl: window.location.pathname, noReuse: true },
      },      
      {
        path: 'changepassword',
        component: ChangepasswordComponent,
        data: { returnUrl: window.location.pathname, noReuse: true },
      },
      {
        path: 'resetpassword',
        component: ResetpasswordComponent,
        data: { returnUrl: window.location.pathname, noReuse: true },
      },
      {
        path: 'regisresetpsw',
        component: RegisResetpasswordComponent,
        data: { returnUrl: window.location.pathname, noReuse: true },
      },
      {
        path: 'activate',
        component: ActivateaccountComponent,
        data: { returnUrl: window.location.pathname, noReuse: true },
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
