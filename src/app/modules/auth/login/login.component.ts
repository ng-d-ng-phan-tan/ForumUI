import { Component } from '@angular/core';
import {toast} from 'src/assets/js/main.js';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../../custome-style.css']
})
export class LoginComponent {
  emailValue: string = '';
  passwordValue: string = '';


  constructor(private auth: AuthService,
    private cookieService: CookieService) {}

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
        debugger
        this.cookieService.set('access_token', res.data.token, 3600);
        this.cookieService.set('refresh_token', res.data.refreshToken, 3600)
        console.log(this.cookieService.get('access_token'))
        console.log(this.cookieService.get('refresh_token'))
      }
      else{
        toast('Failed', res.message,'error',3000);
      }
    });
    // console.log(this.cookieService.check('access_token'))
  }
}
