import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {toast} from 'src/assets/js/main.js';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css','../../../../custome-style.css']
})
export class ChangepasswordComponent {
  emailValue: string = '';
  passwordValue: string = '';
  newPasswordValue : string = '';

  constructor(private auth: AuthService) {}

  onClickChangePassword(){
    if(this.passwordValue == this.newPasswordValue){
      toast('Warning', 'New password is not allowed to be the same to your old password','warning',3000);
      return;
    }
    let obj = {
      email : this.emailValue,
      currentPassword : this.passwordValue,
      newPassword: this.newPasswordValue,
    }
    this.auth.changePassword(obj).subscribe((res) => {
      if(res.status == 200){
        toast('Success', 'Change password success','success',3000);
      }
      else {
        toast('Failed', 'Change password failed','error',3000);
      }
    })
  }
}
