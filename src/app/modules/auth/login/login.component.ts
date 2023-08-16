import { UsersService } from 'src/app/modules/users/users.service';
import { Component } from '@angular/core';
import { toast } from 'src/assets/js/main.js';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../custome-style.css'],
})
export class LoginComponent {
  emailValue: string = '';
  passwordValue: string = '';
  processingLogin = false;

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private userService: UsersService,
    private router: Router
  ) {}

  onClickLogin() {
    this.processingLogin = true;
    let obj = {
      deviceToken: this.auth.getDeviceToken(),
      email: this.emailValue,
      password: this.passwordValue,
      role: 'user'
    };
    this.auth.login(obj).subscribe((res: any) => {
    this.processingLogin = false;
      if (res.status == 200) {
        toast('Success', 'Login success', 'success', 3000);
        this.cookieService.set('access_token', res.data.token, 3600);
        this.cookieService.set('user_id', res.data.userId, 3600);
        this.cookieService.set('refresh_token', res.data.refreshToken, 7200);
        this.userService.getUser(res.data.userId).subscribe((userResponse) => {
          if (userResponse.status == '200') {
            if (res.data[0] as User) {
              localStorage.setItem('loginUser', JSON.parse(res.data[0]));
            }
          }
        });
        this.navigateToHome();
      } else {
        toast('Failed', res.message, 'error', 3000);
      }
    });
    // console.log(this.cookieService.check('access_token'))
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
