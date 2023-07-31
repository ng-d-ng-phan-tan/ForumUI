import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  emailValue: string = '';
  passwordValue: string = '';
  newPasswordValue : string = '';

  constructor(private auth: AuthService) {}

  onClickChangePassword(){
    if(this.passwordValue == this.newPasswordValue){
      alert("Mật khẩu mới không được trùng với mật khẩu cũ")
      return;
    }
    let obj = {
      email : this.emailValue,
      currentPassword : this.passwordValue,
      newPassword: this.newPasswordValue,
    }
    this.auth.changePassword(obj).subscribe((res) => {
      if(res.status == 200){
        alert("Đổi mật khẩu thành công");
      }
      else {
        alert("Đổi mật khẩu thất bại");
      }
    })
  }
}
