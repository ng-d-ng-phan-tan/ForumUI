import { Component, OnInit } from '@angular/core';
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
    private router: Router
  ) {}

  lstUsers: User[] = [];
  ngOnInit(): void {
    this.userService.getUsersPaging(1).subscribe((res: any) => {
      if (res.status == '200') {
        this.lstUsers = this.lstUsers.concat(res.data.data);
        console.log('res', this.lstUsers);
      }
    });
  }

  selectUser(user: User) {
    window.location.href += '/' + user.user_id;
  }
}
