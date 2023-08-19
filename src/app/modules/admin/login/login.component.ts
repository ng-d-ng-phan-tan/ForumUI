import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../../users/users.service';
import { Router } from '@angular/router';
import { toast } from 'src/assets/js/main.js';
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
    debugger;
    this.processingLogin = true;
    let obj = {
      deviceToken: this.auth.getDeviceToken(),
      email: this.emailValue,
      password: this.passwordValue,
      role: 'admin',
    };

    if (obj.email == '' || obj.email == null) {
      this.processingLogin = false;
      toast('Failed', 'Please input your email', 'error', 1500);
      return;
    }
    if (obj.password == '' || obj.password == null) {
      this.processingLogin = false;
      toast('Failed', 'Please input your password', 'error', 1500);
      return;
    }

    this.auth.login(obj).subscribe((res: any) => {
      this.processingLogin = false;
      if (res.status == 200) {
        // toast('Success', 'Login success', 'success', 3000);
        this.cookieService.set('access_token', res.data.token, 3600);
        this.cookieService.set('user_id', res.data.userId, 3600);
        this.cookieService.set('refresh_token', res.data.refreshToken, 7200);
        this.userService.getUser(res.data.userId).subscribe((userResponse) => {
          if (userResponse.status == '200') {
            if (userResponse.data[0] as User) {
              localStorage.setItem(
                'loginUser',
                JSON.parse(userResponse.data[0])
              );
              this.navigateToHome();
            }
          }
        });
      } else {
        toast('Failed', res.message, 'error', 3000);
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/admin']);
  }
}
