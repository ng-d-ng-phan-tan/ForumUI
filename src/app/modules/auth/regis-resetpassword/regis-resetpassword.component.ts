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

  constructor(private auth: AuthService) {}

  onClickSendMailResetPsw(){
    // toast('Thông tin', 'Bạn vừa bấm vào nút đăng nhập','info',3000);
    // toast('Cảnh báo', 'Bạn vừa bấm vào nút đăng nhập','warning',3000);
    // toast('Thành công', 'Bạn đã đăng nhập thành công','success',3000);
    // toast('Thất bại', 'Đăng nhập thất bại','error',3000);
  
    this.auth.registResetPassword(this.emailValue).subscribe((res) => {
      if(res.status == 200){    
        toast('Success', res.message, 'success',3000);
      }
      else{
        toast('Failed', 'Send reset password mail failed, invalid email','error',3000);
      }
    });
  }
}
