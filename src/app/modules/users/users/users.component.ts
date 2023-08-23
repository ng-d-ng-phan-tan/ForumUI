import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'src/assets/js/main.js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private titleService: Title,
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private df: ChangeDetectorRef,
    private cookieService: CookieService
  ) {
    this.titleService.setTitle('Users - VietDevelop');
  }

  lstUsers: User[] = [];
  curPage: number = 1;
  lstSearchUsers: User[] = [];
  curSeachPage: number = 1;
  count = 0;
  searchCount = 0;
  curSearchValue: string = '';
  loginUserID: string = '';
  isAdmin: boolean = false;
  isSearching: boolean = false;
  isLoading = true;
  loginUser!: User;
  ngOnInit(): void {
    this.loginUserID = this.cookieService.get('user_id');
    let userInfo = localStorage.getItem('loginUser');
    if (userInfo) {
      this.loginUser = JSON.parse(userInfo) as User;
    }
    this.getUsersPagination();
  }

  getUsersPagination() {
    if (this.curPage > 0) {
      this.lstUsers = [];
      this.isLoading = true;
      this.userService
        .getUsersPaging(this.curPage, this.isAdmin, this.curSearchValue)
        .subscribe((res: any) => {
          if (res.status == '200') {
            this.lstUsers = res.data.data;
            this.isLoading = false;
            this.userService.getCount(this.isAdmin).subscribe((res) => {
              if (res.status == '200') {
                this.count = res.data;
                console.log('count', this.count);

                this.df.detectChanges();
              }
            });
            console.log('res', this.lstUsers);
          }
        });
      this.df.detectChanges();
    }
  }

  selectUser(user: User) {
    window.location.href += '/' + user.user_id;
  }

  goToPage(isNextPage: boolean) {
    if (isNextPage) {
      this.curPage += 1;
    } else {
      this.curPage -= 1;
    }
    this.getUsersPagination();
  }

  goToSearchPage(isNextPage: boolean) {
    if (isNextPage) {
      this.curSeachPage += 1;
    } else {
      this.curSeachPage -= 1;
    }
    this.searchUsers();
  }

  searchName(evt: any) {
    this.curSearchValue = evt.target.value;
    if (this.curSearchValue == '') {
      this.lstSearchUsers = [];
      this.isSearching = false;
    }
  }

  keyUpEvent(event: any) {
    if (event.key.toLowerCase() == 'enter') {
      this.searchUsers();
    }
  }

  searchUsers() {
    this.isSearching = true;
    if (this.curSearchValue != '') {
      //#region ElasticSearch
      this.userService
        .searchUsers(this.curSearchValue, this.curSeachPage)
        .subscribe((res: any) => {
          if (res) {
            this.lstSearchUsers = res.users as User[];
            this.isSearching = false;
            this.searchCount = res.total;
            if (this.lstSearchUsers.length == 0) {
              toast('Failed', 'No user matches the given name', 'error', 3000);
            }
          } else {
            this.isSearching = false;
            this.lstSearchUsers = [];
            toast('Failed', 'No user matches the given name', 'error', 3000);
          }
        });
    } else {
      this.isSearching = false;
      this.lstSearchUsers = [];
    }
  }
}
