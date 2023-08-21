import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {toast} from 'src/assets/js/main.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css','../../../../custome-style.css']
})
export class ChangepasswordComponent {
  emailValue: string = '';
  passwordValue: string = '';
  newPasswordValue : string = '';
  processingChangePsw = false;

  constructor(private auth: AuthService,
    private router: Router) {}

  onClickChangePsw(){
    this.processingChangePsw = true;

    let obj = {
      email : this.emailValue,
      currentPassword : this.passwordValue,
      newPassword: this.newPasswordValue,
    }
    if(obj.email == '' || obj.email == null){
      this.processingChangePsw = false;
      toast('Failed','Please input your email','error',1500);
      return
    }
    if(obj.currentPassword == '' || obj.currentPassword == null){
      this.processingChangePsw = false;
      toast('Failed','Please input your current password','error',1500);
      return
    }
    if(obj.newPassword == '' || obj.newPassword == null){
      this.processingChangePsw = false;
      toast('Failed','Please input your new password','error',1500);
      return
    }
    if(this.passwordValue == this.newPasswordValue){
      this.processingChangePsw = false;
      toast('Warning', 'New password is not allowed to be the same to your old password','warning',3000);
      return;
    }
    this.auth.changePassword(obj).subscribe((res) => {
  this.processingChangePsw = false;
      if(res.status == 200){
        toast('Success', 'Change password success','success',2000);
        setTimeout(() => {
          this.router.navigate(['/admin/auth/login']);
        }, 2000)
      }
      else {
        toast('Failed', 'Change password failed','error',3000);
      }
    })
  }
}
