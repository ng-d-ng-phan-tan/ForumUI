import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService
  ) {}

  userId: any;

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  alreadyLogin() {
    if (this.cookieService.check('access_token')) {
      this.userId = this.cookieService.get('user_id');
      return true;
    }
    return false;
  }

  logOut() {
    this.auth
      .logout(this.cookieService.get('access_token'))
      .subscribe((res) => {
        if (res.status == 200) {
          this.cookieService.delete('access_token');
          this.cookieService.delete('refresh_token');
        }
      });
  }
}
