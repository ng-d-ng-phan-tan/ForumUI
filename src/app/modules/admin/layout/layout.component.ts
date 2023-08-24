import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from '../../users/users.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {formatDistance} from 'date-fns';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit{
  userId: any;
  loginUser: User | undefined;
  loadingSomething = false;
  notifications: any[] = [];
  totalNotificationUnread = 0;
  isDropdownActive: boolean = false;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService,
    private user: UsersService,
    private realTimeMessage: MessagingService,
    private http: HttpClient,
  ) {}

  toggleDropdown() {
    this.isDropdownActive = !this.isDropdownActive;
    this.http.put(`${environment.NOTI_SERVICE_URL}read-notification/${this.userId}`, {}).subscribe((res: any) => {
      this.totalNotificationUnread = 0;
    })
  }
  formatDistance(date: Date) {
    return formatDistance(new Date(date), new Date(), {addSuffix: true});
  }
  ngOnInit(): void {
    if(this.alreadyLogin()){
      this.http
        .get(`${environment.NOTI_SERVICE_URL}notification/${this.userId}`)
        .subscribe((res: any) => {
          this.notifications = res?.notifications || [];
          this.totalNotificationUnread = res?.totalUnread || 0;
        });

      this.realTimeMessage.currentMessage.subscribe((res) => {
        if (res) {
          this.notifications.unshift(res?.notification);
          this.totalNotificationUnread++;
        }
      });
    }
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
          this.navigateToLoginPage();
        });
    }
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

  navigateToLoginPage() {
    this.router.navigate(['/admin/auth/login']);
  }

  switchReceiveEmail(){
  this.loadingSomething = true;
    if(this.loginUser){
      this.loginUser.receive_notify_email = !this.loginUser?.receive_notify_email;
      let temp = this.loginUser
      this.user.updateUser(this.loginUser).subscribe((res) => {
      this.loadingSomething = false;
        if(res.status == 200){
          this.loginUser = temp;
          localStorage.setItem(
            'loginUser',
            JSON.stringify(this.loginUser)
          );
        }
      })
    }
  }
}
