import { Component } from '@angular/core';
import {toast} from 'src/assets/js/main.js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css','../../../../custome-style.css']
})
export class ResetpasswordComponent {
  emailValue: string = '';
  resetPasswordStrValue: string = '';
  newPasswordValue : string = '';

  constructor(private auth: AuthService) {}

  onClickResetPassword(){
    // toast('Thông tin', 'Bạn vừa bấm vào nút đăng nhập','info',3000);
    // toast('Cảnh báo', 'Bạn vừa bấm vào nút đăng nhập','warning',3000);
    // toast('Thành công', 'Bạn đã đăng nhập thành công','success',3000);
    // toast('Thất bại', 'Đăng nhập thất bại','error',3000);
  
    let obj ={
      email: this.emailValue,
      resetPasswordStr: this.resetPasswordStrValue,
      passwordReset: this.newPasswordValue,
    }
    this.auth.resetPassword(obj).subscribe((res) => {
      if(res.status == 200){    
        toast('Success', 'Reset password success','success',3000);
      }
      else{
        toast('Failed', 'Reset password failed','error',3000);
      }
    });
  }
}
