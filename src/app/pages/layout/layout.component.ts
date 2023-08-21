import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  loadingSomething = false;

  notifications: any = [
    {
      title: 'New message from John Doe',
      body: 'Hi, I just wanted to let you know that I finished the project you assigned me.',
      type: 'info',
    },
    {
      title: 'Your account has been updated',
      body: 'Your account has been updated with the latest security settings.',
      type: 'success',
    },
    {
      title: 'Your order has been shipped',
      body: 'Your order has been shipped and will arrive within 2-3 business days.',
      type: 'warning',
    },
  ];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService
  ) {}

  userId: any;
  loginUser: User | undefined;
  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  alreadyLogin() {
    if (this.cookieService.check('access_token')) {
      this.userId = this.cookieService.get('user_id');
      let userInfo = localStorage.getItem('loginUser');
      if (userInfo) {
        this.loginUser = JSON.parse(userInfo) as User;
      }
      return true;
    }
    return false;
  }

  logOut() {
    this.loadingSomething = true;
    if(this.cookieService.check('access_token')){
      this.cookieService.delete('access_token');
      this.cookieService.delete('refresh_token');
      this.cookieService.delete('user_id');
      localStorage.removeItem('loginUser');
      this.loginUser = undefined;
    }
    this.auth
      .logout(this.cookieService.get('access_token'))
      .subscribe((res) => {
        this.loadingSomething = false;
      });
  }

  showNotificationList() {}

  showNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  closeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(
      (n: any) => n !== notification
    );
  }
}
