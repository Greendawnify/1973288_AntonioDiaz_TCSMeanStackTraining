import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpRef = new FormGroup({
    user: new FormControl(),
    pass: new FormControl(),
    fname : new FormControl(),
    lname : new FormControl(),
  });

  badInput:boolean = false;

  testMesg:string ='';

  constructor(public route:Router) { }

  ngOnInit(): void {
  }

  loginRedirect(){
    console.log('yo, from sign up');
    this.route.navigate(['login']);
  }

  registerUser(){
    let user = this.signUpRef.get('user')?.value;
    let pass = this.signUpRef.get('pass')?.value;
    let fname = this.signUpRef.get('fname')?.value;
    let lname = this.signUpRef.get('lname')?.value;

    if(user !== null && pass !== null && fname !== null && lname !== null ){
      user = user.trim();
      pass = pass.trim();
      fname = fname.trim();
      lname = lname.trim();
    }else{
      this.badInput =true;
      this.resetInputValues();
      return;
    }

    if(user == '' || pass == '' || fname == "" || lname ==''){
      // show banner saying user put in bad input
      this.badInput =true;
      this.resetInputValues();
      return;

    }

    this.badInput =false;

    let newObj = {
      user,
      pass,
      fname,
      lname,
      contacts:[]
    };

    sessionStorage.setItem('User', JSON.stringify(newObj));
    console.log(newObj);

    // navigate to login page
    this.route.navigate(['login']);
  }

  resetInputValues(){
    this.signUpRef.get('user')?.setValue('');
    this.signUpRef.get('pass')?.setValue('');
    this.signUpRef.get('lname')?.setValue('');
    this.signUpRef.get('fname')?.setValue('');

  }

  clearStorage(){
    sessionStorage.clear();
  }

}
