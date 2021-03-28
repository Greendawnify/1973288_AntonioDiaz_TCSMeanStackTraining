import { Component, OnInit } from '@angular/core';
import { QuestionListService } from './../question-list.service';
import { Question } from './../question.model';
import {FormGroup, FormControl } from '@angular/forms/forms';
import { User, UserAnswers } from './../userAnswers.model';
import { NumberListService } from './../number-list.service';
import { Router } from '@angular/router';
import { UserServiceService } from './../user-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  submitIsValid:boolean = false;
  finished:boolean = false;

  questions:Question[] =new Array();
  index:number = -1;
  maxQuestions:number = 10;

  title:string ="";
  choices:string[] = new Array();
  choiceLetter:string[] = ['a','b','c','d'];
  answer:string = "";
  checkedAnswerValue:number = 0;
  id:number = -1;


  constructor(
    public qList : QuestionListService, 
    public nList:NumberListService,
    public route: Router,
    public user:UserServiceService
    ) { }

  ngOnInit(): void {
    this.questions = this.qList.questions;
    this.maxQuestions = this.qList.questions.length;
    this.getAQuestion();

  }

  finishTest(){
    // last question submitted
    this.fillUserAnswers();
    this.route.navigate(['endpage']);
  }

  submitQuestion(){
    // add users answer to the respective files
    this.fillUserAnswers();
    this.getAQuestion();
  }

  fillUserAnswers(){
    let newAnswer:UserAnswers = new UserAnswers(this.id, this.checkedAnswerValue);
    console.log('Filling the user with', newAnswer);
    this.user.push(newAnswer); // adds to the user obje
  }

  getAQuestion(){
    // get a randome question id
    let rando = this.nList.retrieveQuestionID();


    let newTest:Question[] = this.questions.filter(quest => {
      if(quest.id == rando){
        console.log(quest.id);
        return quest;
      }
      return;
    });
    console.log("next question", newTest);

    this.fillTest(newTest[0]);

  }

  fillTest(test:Question){
    this.title = test.title;
    this.choices = test.choices;
    this.answer = test.answer;
    this.id = test.id;
    console.log(`${this.title}, ${this.choices}, ${this.answer}, ${this.id}`)
    this.index++;

    if(this.index == this.maxQuestions-1){
      this.finished = true;
    }
    this.submitIsValid = false;
  }

  checked(value:any){
    console.log('Checked', value);
    this.checkedAnswerValue = value;
    this.submitIsValid = true;
  }

  

}
