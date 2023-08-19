import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'src/assets/js/main.js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private df: ChangeDetectorRef,
    private cookieService: CookieService
  ) {}

  lstUsers: User[] = [];
  curPage: number = 1;
  lstSearchUsers: User[] = [];
  curSeachPage: number = 1;

  curSearchValue: string = '';
  loginUserID: string = '';
  isAdmin: boolean = false;
  isSearching: boolean = false;
  isLoading = true;
  ngOnInit(): void {
    this.loginUserID = this.cookieService.get('user_id');

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
            this.df.detectChanges();
            console.log('res', this.lstUsers);
          }
        });
      this.df.detectChanges();
    }
    // let user = new User();
    // user.user_id = '1234';
    // user.name = 'Test';
    // user.email = 'test@example.com';
    // user.gender = true;
    // user.avatar = './images/avatar-01.jpg';
    // this.lstUsers = [user];
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

  searchUsers() {
    this.isSearching = true;
    if (this.curSearchValue != '') {
      // this.userService
      //   .getUsersPaging(this.curSeachPage, this.isAdmin, this.curSearchValue)
      //   .subscribe((res: any) => {
      //     if (res?.status == '200') {
      //       this.lstSearchUsers = res.data.data as User[];
      //       this.isSearching = false;
      //       if (this.lstSearchUsers.length == 0) {
      //         toast('Failed', 'No user matches the given name', 'error', 3000);
      //       }
      //     }
      //   });
      this.userService
        .searchUsers(this.curSearchValue)
        .subscribe((res: any) => {
          if (res) {
            this.lstSearchUsers = res.users as User[];
            this.isSearching = false;
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
