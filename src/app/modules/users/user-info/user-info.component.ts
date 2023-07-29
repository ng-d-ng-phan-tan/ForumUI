import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    route.params.subscribe((params) => {
      this.userService.getUser(params['user_id']).subscribe((res) => {
        if (res.status == '200') {
          this.user = res.data[0] as User;
        }
      });
    });
  }

  user: User = new User();
  ngOnInit() {}
}
