import { Component } from '@angular/core';
import {toast} from 'src/assets/js/main.js';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-regis-resetpassword',
  templateUrl: './regis-resetpassword.component.html',
  styleUrls: ['./regis-resetpassword.component.css','../../../../custome-style.css']
})
export class RegisResetpasswordComponent {
  emailValue: string = '';
  processingSendingMail = false;

  constructor(private auth: AuthService) {}

  onClickSendMailResetPsw(){
    // toast('Thông tin', 'Bạn vừa bấm vào nút đăng nhập','info',3000);
    // toast('Cảnh báo', 'Bạn vừa bấm vào nút đăng nhập','warning',3000);
    // toast('Thành công', 'Bạn đã đăng nhập thành công','success',3000);
    // toast('Thất bại', 'Đăng nhập thất bại','error',3000);
    this.processingSendingMail = true;
    if(this.emailValue == '' || this.emailValue == null){
      this.processingSendingMail = false;
      toast('Failed','Please input your email','error',1500);
      return
    }

    this.auth.registResetPassword(this.emailValue).subscribe((res) => {
      this.processingSendingMail = false;
      if(res.status == 200){    
        toast('Success', res.message, 'success',3000);
      }
      else{
        toast('Failed', 'Send reset password mail failed, invalid email','error',3000);
      }
    });
  }
}
