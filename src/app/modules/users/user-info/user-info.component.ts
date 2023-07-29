import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

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
      // console.log(params['id']);
      this.userService.getUser(params['user_id']).subscribe((res) => {
        console.log('user', res);
      });
    });
    let breakhere = true;
  }

  ngOnInit() {}

  asd() {}
}
