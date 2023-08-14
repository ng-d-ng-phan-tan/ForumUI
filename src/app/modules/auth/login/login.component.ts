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

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private userService: UsersService,
    private router: Router
  ) {}

  onClickLogin() {
    // toast('Thông tin', 'Bạn vừa bấm vào nút đăng nhập','info',3000);
    // toast('Cảnh báo', 'Bạn vừa bấm vào nút đăng nhập','warning',3000);
    // toast('Thành công', 'Bạn đã đăng nhập thành công','success',3000);
    // toast('Thất bại', 'Đăng nhập thất bại','error',3000);
    let obj = {
      deviceToken: this.auth.getDeviceToken(),
      email: this.emailValue,
      password: this.passwordValue,
    };
    this.auth.login(obj).subscribe((res: any) => {
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
