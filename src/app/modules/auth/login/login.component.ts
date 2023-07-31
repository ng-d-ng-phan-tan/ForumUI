import { Component } from '@angular/core';
import {toast} from 'src/assets/js/main.js';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../../custome-style.css']
})
export class LoginComponent {
  emailValue: string = '';
  passwordValue: string = '';


  constructor(private auth: AuthService) {}

  onClickLogin(){
    // toast('Thông tin', 'Bạn vừa bấm vào nút đăng nhập','info',3000);
    // toast('Cảnh báo', 'Bạn vừa bấm vào nút đăng nhập','warning',3000);
    // toast('Thành công', 'Bạn đã đăng nhập thành công','success',3000);
    // toast('Thất bại', 'Đăng nhập thất bại','error',3000);
  
    let obj ={
      email: this.emailValue,
      password: this.passwordValue,
    }
    this.auth.login(obj).subscribe((res) => {
      if(res.status == 200){    
        toast('Success', 'Login success','success',3000);
      }
      else{
        toast('Failed', 'Login failed','error',3000);
      }
    });
  }
}
