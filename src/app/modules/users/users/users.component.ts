import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private df: ChangeDetectorRef
  ) {}

  lstUsers: User[] = [];
  curPage: number = 1;
  curSearchValue: string = '';
  ngOnInit(): void {
    this.getUsersPagination();
  }

  getUsersPagination() {
    if (this.curPage > 0) {
      this.lstUsers = [];
      this.userService.getUsersPaging(this.curPage).subscribe((res: any) => {
        if (res.status == '200') {
          this.lstUsers = res.data.data;
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

  searchName(evt: any) {
    this.curSearchValue = evt.target.value;
  }

  searchUsers() {
    // this.userService.searchUsers().subscribe(users => {
    //   this.lstUsers = users
    // })
  }
}
