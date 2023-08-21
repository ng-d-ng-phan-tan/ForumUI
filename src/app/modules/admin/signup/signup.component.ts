import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {toast} from 'src/assets/js/main.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../../../../custome-style.css']
})
export class SignupComponent {
  nameValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  processingSignUp = false;

  constructor(private auth: AuthService,
    private router: Router) {}

  onClickRegister(){
    this.processingSignUp = true;
    let obj ={
      name: this.nameValue,
      email: this.emailValue,
      password: this.passwordValue,
      role: 'admin'
    }
    if(obj.name == '' || obj.name == null){
      this.processingSignUp = false;
      toast('Failed','Please input your name','error',1500);
      return
    }
    if(obj.email == '' || obj.email == null){
      this.processingSignUp = false;
      toast('Failed','Please input your email','error',1500);
      return
    }
    if(obj.password == '' || obj.password == null){
      this.processingSignUp = false;
      toast('Failed','Please input your password','error',1500);
      return
    }
    this.auth.register(obj).subscribe((res) => {
      if(res.status == 200){
        toast('Success', res.message,'success',3000);
        setTimeout(() => {
          this.router.navigate(['admin/auth/login']);
        }, 3000)
      }
      else{
        toast('Failed', res.message,'error',3000);
      }
    });
  }
}
