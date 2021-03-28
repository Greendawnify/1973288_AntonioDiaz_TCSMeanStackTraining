import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question.model';



@Injectable({
  providedIn: 'root'
})
export class NumberListService {

  public questionIdList:number[] = new Array();
  constructor(public http:HttpClient) { }

  createListOfQuestion(list:Question[]){
    for(let i =0; i<list.length; i++){
      this.questionIdList.push(list[i].id);
    }
    console.log(this.questionIdList);
  }

  retrieveQuestionID():number{
    let number:number = Math.floor(Math.random() * (this.questionIdList.length-1));
    console.log('The questino id we are selecting is ', number);

    let index = this.questionIdList[number];
    this.questionIdList.splice(number, 1);
    console.log('What is left in the id list is, ', this.questionIdList);
    
    return index;
  }
}
