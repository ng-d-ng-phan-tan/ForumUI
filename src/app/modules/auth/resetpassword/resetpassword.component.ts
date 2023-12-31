import { Component } from '@angular/core';
import {toast} from 'src/assets/js/main.js';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css','../../../../custome-style.css']
})
export class ResetpasswordComponent {
  emailValue: string = '';
  resetPasswordStrValue: string = '';
  newPasswordValue : string = '';
  resetPswProcess = false;

  constructor(private auth: AuthService,
    private router: Router) {}

  onClickResetPassword(){
    // toast('Thông tin', 'Bạn vừa bấm vào nút đăng nhập','info',3000);
    // toast('Cảnh báo', 'Bạn vừa bấm vào nút đăng nhập','warning',3000);
    // toast('Thành công', 'Bạn đã đăng nhập thành công','success',3000);
    // toast('Thất bại', 'Đăng nhập thất bại','error',3000);
  this.resetPswProcess = true;
    let obj ={
      email: this.emailValue,
      resetPasswordStr: this.resetPasswordStrValue,
      passwordReset: this.newPasswordValue,
    }

    if(obj.email == '' || obj.email == null){
      this.resetPswProcess = false;
      toast('Failed','Please input your email','error',1500);
      return
    }
    if(obj.resetPasswordStr == '' || obj.resetPasswordStr == null){
      this.resetPswProcess = false;
      toast('Failed','Please input your reset password string','error',1500);
      return
    }
    if(obj.passwordReset == '' || obj.passwordReset == null){
      this.resetPswProcess = false;
      toast('Failed','Please input your new password','error',1500);
      return
    }

    this.auth.resetPassword(obj).subscribe((res) => {
  this.resetPswProcess = false;
      if(res.status == 200){    
        toast('Success', 'Reset password success','success',2000);
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000)
      }
      else{
        toast('Failed', 'Reset password failed','error',3000);
      }
    });
  }
}
