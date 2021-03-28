import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {

  questions:Question[] = new Array();
  constructor(public http:HttpClient) { }

  loadQuestionDetails():void{
    this.http.get<Question[]>("../assets/questions.json").subscribe(q => this.questions = q);
  }
}
