import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { UsersService } from 'src/app/modules/users/users.service';
import { QuestionsService } from 'src/app/modules/questions/question.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  loadingSomething = false;
  notifications: any[] = [];
  totalNotificationUnread = 0;
  questions: any = [];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private auth: AuthService,
    private http: HttpClient,
    private realTimeMessage: MessagingService,
    private usersService: UsersService,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    if (this.alreadyLogin()) {
      this.http
        .get(`http://localhost:8005/api/notification/${this.userId}`)
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
    this.getNewDiscussions();
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
    if (this.cookieService.check('access_token')) {
      this.loadingSomething = true;
      let access_token = this.cookieService.get('access_token');
      this.cookieService.delete('access_token');
      this.cookieService.delete('refresh_token');
      this.cookieService.delete('user_id');
      this.realTimeMessage.currentMessage.unsubscribe();
      localStorage.removeItem('loginUser');
      this.loginUser = undefined;
      this.auth.logout(access_token).subscribe((res) => {
        this.loadingSomething = false;
      });
    }
  }

  showNotificationList() {
    //update notification isRead
    this.http
      .put(`http://localhost:8005/api/read-notification/${this.userId}`, {})
      .subscribe((res: any) => {
        this.totalNotificationUnread = 0;
      });
  }

  showNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  closeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(
      (n: any) => n !== notification
    );
  }

  getNewDiscussions() {
    this.questionsService.getQuestions().subscribe((result: any) => {
      let lstUserID: any[] = [];
      this.questions = result.data.slice(0, 3);
      this.questions.map((question: any) => {
        lstUserID.push(question.questioner_id);
      });
      let users = [];
      this.usersService.getUsers(lstUserID).subscribe((res: any) => {
        if (res.status === '200') {
          users = res.data;

          let result = [];

          for (const question of this.questions) {
            let user = users.filter((user: any) => {
              return question.questioner_id === user.user_id;
            });
            const questionWithUser = {
              ...question,
              user,
            };
            result.push(questionWithUser);
          }

          this.questions = result;
        }
      });
    });
  }
}
