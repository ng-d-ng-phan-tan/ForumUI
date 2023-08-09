import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
})
export class AvatarsComponent implements OnInit {
  // @Input() ids: string[] = [];
  @Input() lstIDs: string[] = [];
  @Input() lstUsers: User[] = [];
  @Input() width: number = 0;
  @Input() isProfile: boolean = true;
  @Input() showMax: number = 0;
  constructor(
    private userService: UsersService,
    private df: ChangeDetectorRef
  ) {}

  lstShowUsers: User[] = [];
  curUser: User = new User();
  ngOnInit() {
    if (this.lstIDs.length > 0) {
      this.userService.getUsers(this.lstIDs).subscribe((res) => {
        if (res.status == '200') {
          this.lstUsers = res.data;
          this.curUser = this.lstUsers[0];
          for (let index = 0; index < this.showMax; index++) {
            this.lstShowUsers.push(this.lstUsers[index]);
          }
        }
      });
    } else {
      this.curUser = this.lstUsers[0];
      for (let index = 0; index < this.showMax; index++) {
        this.lstShowUsers.push(this.lstUsers[index]);
      }
    }
  }

  changeAvatar(evt: any) {
    this.userService
      .changeAvatar(evt.target.files[0])
      .subscribe((response: any) => {
        this.curUser.avatar = response.url;
        this.userService.updateUser(this.curUser).subscribe((updateRes) => {});
        this.df.detectChanges();
      });
  }
}
