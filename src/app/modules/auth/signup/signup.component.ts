import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {toast} from 'src/assets/js/main.js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../../../../custome-style.css']
})
export class SignupComponent {
  nameValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';

  constructor(private auth: AuthService) {}

  onClickSignUp(){
    let obj ={
      name: this.nameValue,
      email: this.emailValue,
      password: this.passwordValue,
      role: 'admin'
    }
    this.auth.register(obj).subscribe((res) => {
      debugger
      if(res.status == 200){
        toast('Success', 'Register success','success',3000);
      }
      else{
        toast('Failed', 'Register failed please check your input','error',3000);
      }
    });
  }
}
