import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import { User } from '../../models/user.model';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private datePipe: DatePipe,
    private df: ChangeDetectorRef
  ) {
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
            name: new FormControl({ value: this.user.name, disabled: false }),
            email: new FormControl({ value: this.user.email, disabled: true }),
            gender: new FormControl(this.user.gender),
            date_of_birth: new FormControl(this.user.date_of_birth),
            role: new FormControl({ value: this.user.role, disabled: true }),
            avatar: new FormControl(this.user.avatar),
            address: new FormControl(this.user.address),
            // about: new FormControl(this.user.about),
          });

          this.formGroup.valueChanges.subscribe((value: any) => {
            this.user.name = value.name;
            this.user.date_of_birth = value.date_of_birth;
            this.user.role = value.role;
          });

          this.lstUserIDs = [
            this.user.user_id,
            // '3b015c4f-1a95-4ab5-b794-cf00cb01c34d',
            // '6c9f45bf-9e8c-4778-affd-69ddcf3384bd',
            // 'c7e2650f-fc9b-4a51-8307-7c88e1b5223b',
            // 'f279d4ce-78fe-4625-943b-a06d242f540e',
          ];

          this.df.detectChanges();
        }
      });
    });
  }

  user: User = new User();
  formGroup: any;
  lstUserIDs: string[] = [];
  ngOnInit() {}
  changeBDay(evt: any) {
    console.log(evt.value);
    this.user.date_of_birth = new Date(evt.value);
  }

  updateInfo() {
    this.userService.updateUser(this.user).subscribe((res) => {
      console.log('update res', res);
    });
  }
}
