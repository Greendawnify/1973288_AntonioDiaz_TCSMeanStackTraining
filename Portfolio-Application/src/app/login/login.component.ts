import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRef = new FormGroup({
    user: new FormControl(),
    pass: new FormControl()
  });

  incorrectLogin:boolean = false;
  loginCredentials:boolean = false;

  mesg:string = "";

  constructor(public route:Router) { }

  ngOnInit(): void {
  }

  signUpRedirect(){
    console.log('yo');
    this.loginCredentials = false;
    this.route.navigate(["signUp"]);
  }

  loginCheck(){
    let user = this.loginRef.get('user')?.value;
    let pass = this.loginRef.get('pass')?.value;

    if(user && pass){
    user = user.trim();
    pass = pass.trim();
    }

    this.mesg = `${user} ${pass}`;

    // check session storage and see if these values equal the one user we have
    let userObj:string|null = sessionStorage.getItem('User');

    if(!userObj){
      this.loginCredentials = true;
      this.resetInputValues();
      return;
      
    }else{
      let jsonObj = JSON.parse(userObj);
      console.log(jsonObj);
      if(user == jsonObj.user && pass == jsonObj.pass){
        console.log('login checks out!');
        sessionStorage.setItem('token', '123');
        this.route.navigate(["portfolio"]);
        this.incorrectLogin = false;
        return;
      }else{
        this.incorrectLogin = true;
        this.resetInputValues();
      }
    }

  }

  resetInputValues(){
    this.loginRef.get('user')?.setValue('');
    this.loginRef.get('pass')?.setValue('');
  }

}
