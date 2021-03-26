import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from './../contact';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  contactRef = new FormGroup({
    name: new FormControl(),
    phone: new FormControl()
  });

  contacts:Contact[] = new Array();

  hasContacts:boolean = true;
  invalidInput:boolean = false;

  username:string = "";

  mesg:string ="";

  constructor(public route:Router) { }

  ngOnInit(): void {
    

    let userObj:string|null = sessionStorage.getItem('User');
    if(!userObj){
      // we should not be on this page?
      console.log('We should not be on this page we dont have a username');
      return;
    }

    let jsonObj = JSON.parse(userObj);
    this.username = jsonObj.user;
    console.log("Checking before I add to contacts",jsonObj.contacts);

    if(jsonObj.contacts){
      this.contacts = jsonObj.contacts;
      console.log('Here are the contacts', this.contacts);
    }

    this.hasContacts = this.contacts.length > 0 ? true : false;
  }

  saveContacts(){
    let user = this.contactRef.get('name')?.value;
    let phone = this.contactRef.get('phone')?.value;

    if(user && phone){
    user = user.trim();
    }
    

    this.mesg = `${user} ${phone}`;

    if(user == '' || phone == '' || phone == null){
      // reveal a banner saying not good inputs
      this.resetInputValues();
      this.invalidInput = true;
      return;
    }else{
      this.hasContacts = true;
      let newContact = new Contact(user, phone);
      this.contacts.push(newContact);
      
      let newJSON = sessionStorage.getItem('User');
      if(newJSON){
        let newObj = JSON.parse(newJSON);
        newObj.contacts = this.contacts;
        sessionStorage.setItem('User', JSON.stringify(newObj));
      }

      this.resetInputValues();
      this.invalidInput = false;
      return;
    }
  }

  logoutUser(){
    sessionStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  resetInputValues(){
    this.contactRef.get('name')?.setValue('');
    this.contactRef.get('phone')?.setValue('');
  }

  

}
