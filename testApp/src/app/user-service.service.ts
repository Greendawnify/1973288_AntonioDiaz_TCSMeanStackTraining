import { Injectable } from '@angular/core';
import { User, UserAnswers } from './userAnswers.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  answers:UserAnswers[] = new Array();
  user:User = new User(this.answers);
  constructor() { }

  push(value:UserAnswers){
    this.answers.push(value);
    this.user.answers = this.answers;
    console.log('User is now', this.user);
  }
}
