import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../models/user.model';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user: User = new User();
  formGroup: any;
  lstUserIDs: string[] = [];
  loginUserID: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private datePipe: DatePipe,
    private df: ChangeDetectorRef,
    private cookieService: CookieService
  ) {
    this.loginUserID = this.cookieService.get('user_id');

    route.params.subscribe((params) => {
      console.log('params', params);

      this.userService.getUser(params['user_id']).subscribe((res) => {
        if (res.status == '200') {
          this.user = res.data[0] as User;
          console.log(this.user);

          this.formGroup = new FormGroup({
            user_id: new FormControl({
              value: this.user.user_id,
              disabled: true,
            }),
            name: new FormControl({
              value: this.user.name,
              disabled: false && this.loginUserID != this.user.user_id,
            }),
            email: new FormControl({ value: this.user.email, disabled: true }),
            gender: new FormControl({
              value: this.user.gender ? 'Nam' : 'Nữ',
              disabled: true,
            }),
            role: new FormControl({ value: this.user.role, disabled: true }),
            avatar: new FormControl({
              value: this.user.avatar,
              disabled: this.loginUserID != this.user.user_id,
            }),
            address: new FormControl({
              value: this.user.address,
              disabled: this.loginUserID != this.user.user_id,
            }),
            about: new FormControl({
              value: this.user.about,
              disabled: this.loginUserID != this.user.user_id,
            }),
          });

          this.formGroup.valueChanges.subscribe((value: any) => {
            this.user.name = value.name;
            this.user.about = value.about;
            this.user.address = value.address;
          });

          this.lstUserIDs = [this.user.user_id];

          this.df.detectChanges();
        }
      });
    });
  }

  ngOnInit() {}
  changeBDay(evt: any) {
    console.log(evt.value);
    this.user.date_of_birth = new Date(evt.value);
  }

  updateInfo() {
    console.log(this.user);

    this.userService.updateUser(this.user).subscribe((res) => {
      console.log('update res', res);
    });
  }
}
