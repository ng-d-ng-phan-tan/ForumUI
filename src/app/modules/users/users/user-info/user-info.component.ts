import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../../../shared/models/user.model';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { toast } from 'src/assets/js/main.js';

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
  isUpdating = false;
  isLoading = true;
  numOfPost: number = 0;
  numOfCmt: number = 0;
  isChangeData: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private datePipe: DatePipe,
    private df: ChangeDetectorRef,
    private cookieService: CookieService
  ) {
    this.loginUserID = this.cookieService.get('user_id');
    this.loginUserID = '324e23de-4034-11ee-be03-06b6018e9be9';
    route.params.subscribe((params) => {
      this.userService.getUser(params['user_id']).subscribe((res) => {
        if (res.status == '200') {
          this.user = res.data[0] as User;
          console.log('on routing', this.user);
          this.isLoading = false;
          this.formGroup = new FormGroup({
            user_id: new FormControl({
              value: this.user.user_id,
              disabled: true,
            }),
            name: new FormControl({
              value: this.user.name,
              disabled: this.loginUserID != this.user.user_id,
            }),
            email: new FormControl({ value: this.user.email, disabled: true }),
            gender: new FormControl({
              value: this.user.gender,
              disabled: this.loginUserID != this.user.user_id,
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
            if (value.name != null) {
              this.user.name = value.name;
              this.isChangeData = true;
            }
            if (value.about != null) {
              this.user.about = value.about;
              this.isChangeData = true;
            }
            if (value.address != null) {
              this.user.address = value.address;
              this.isChangeData = true;
            }
            if (value.gender != null) {
              this.user.gender = value.gender == 'true';
              this.isChangeData = true;
            }
          });

          this.lstUserIDs = [this.user.user_id];

          this.df.detectChanges();
        }
      });
    });
  }

  ngOnInit() {}
  changeBDay(evt: any) {
    let today = new Date();
    let choosed = new Date(evt.value);

    if (choosed < today) {
      this.user.date_of_birth = evt.value;
      this.isChangeData = true;
      this.df.detectChanges();
    } else {
      evt.value = this.user.date_of_birth;
      toast('Failed', 'Birthday must be in the past', 'error', 3000);
      this.df.detectChanges();
    }
  }

  updateInfo() {
    console.log(this.user);
    this.isUpdating = true;
    if ((this.isChangeData = true)) {
      this.userService.updateUser(this.user).subscribe((res) => {
        console.log('update res', res);
        if (res.status == '200') {
          this.isUpdating = false;
          this.isChangeData = false;
          toast('Success', 'Updated', 'success', 3000);
        }
      });
    }
  }
}
