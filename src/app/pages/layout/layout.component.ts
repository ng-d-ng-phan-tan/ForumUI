import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from 'src/app/modules/auth/auth.service';
import {User} from 'src/app/shared/models/user.model';
import {HttpClient} from '@angular/common/http';
import { MessagingService } from 'src/app/core/services/messaging.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  loadingSomething = false;
  notifications: any[] = []

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService,
    private http: HttpClient,
    private realTimeMessage: MessagingService
  ) {
  }

  ngOnInit(): void {
    if (this.alreadyLogin()) {
      this.http
        .get(`http://localhost:8005/api/notification/${this.userId}`)
        .subscribe((res: any) => {
          this.notifications = res?.notifications || [];
        });

      this.realTimeMessage.currentMessage.subscribe((res) => {
        debugger
        console.log('message moi nhat ne', this.realTimeMessage.currentMessage.value);
      })
    }
  }

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
    if(this.cookieService.check('access_token')){
      this.loadingSomething = true;
      let access_token = this.cookieService.get('access_token');
      this.cookieService.delete('access_token');
      this.cookieService.delete('refresh_token');
      this.cookieService.delete('user_id');
      this.realTimeMessage.currentMessage.unsubscribe();
      localStorage.removeItem('loginUser');
      this.loginUser = undefined;
      this.auth
        .logout(access_token)
        .subscribe((res) => {
          this.loadingSomething = false;
        });
    }
  }

  showNotificationList() {
  }

  showNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  closeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(
      (n: any) => n !== notification
    );
  }
}
