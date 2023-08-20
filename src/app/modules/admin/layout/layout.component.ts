import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  userId: any;
  loginUser: User | undefined;
  loadingSomething = false;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService
  ) {}

  logOut() {
    this.loadingSomething = true;
    this.auth
      .logout(this.cookieService.get('access_token'))
      .subscribe((res) => {
        this.loadingSomething = false;
        if (res.status == 200) {
          this.cookieService.delete('access_token');
          this.cookieService.delete('refresh_token');
          localStorage.removeItem('loginUser');
          this.loginUser = undefined;
          this.navigateToLoginPage();
        }
      });
  }

  alreadyLogin() {
    if (this.cookieService.check('access_token')) {
      this.userId = this.cookieService.get('user_id');
      let userInfo = localStorage.getItem('loginUser');
      if (userInfo) {
        debugger
        this.loginUser = JSON.parse(userInfo) as User;
      }
      return true;
    }
    return false;
  }

  navigateToLoginPage() {
    this.router.navigate(['/admin/auth/login']);
  }
}
