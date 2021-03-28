import { Component, OnInit } from '@angular/core';
import { QuestionListService } from './../question-list.service';
import { UserServiceService } from './../user-service.service';
import { Question } from './../question.model';
import { UserAnswers } from '../userAnswers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-endpage',
  templateUrl: './endpage.component.html',
  styleUrls: ['./endpage.component.css']
})
export class EndpageComponent implements OnInit {

  reveled:boolean = true;

  orderedQuestions:Question[] = new Array();
  className:string = 'HelloFriends';
  isCorrect:string = 'yes';
  numOfCorrectQuestions:number = 0;
  finalGrade:string = "";

  constructor(
    public qList:QuestionListService, 
    public user : UserServiceService, 
    public route:Router
    ) { }

  ngOnInit(): void {
    let userList = this.user.user.answers;
    console.log(`before using the user list here it is`, userList);
    for(let i =0; i < userList.length; i++){

      let questionObj:Question[] = this.qList.questions.filter(question => {
        if(userList[i].questionId == question.id){
          return question;
        }
        return;
      });

      this.orderedQuestions.push(questionObj[0]);
    }
    console.log(this.orderedQuestions);
  }

  revealResults(){
    let obj:any;
    let userList = this.user.user.answers;
    let idAnswer:number = 0;
    console.log('UserList contents', userList);

    let index:number = 0;
    for(let question of this.orderedQuestions){
      obj = document.getElementById(question.id.toString());
      let questionAnswerValue:number = question.answerValue;
      let userAnswerValue:number = userList[index].answer;

      if(userAnswerValue === questionAnswerValue){
        obj.className = 'correct';
        this.revelCorrectAnswer(question.choices, question.answerValue, question.id, true);
        index++;
        this.numOfCorrectQuestions++;
        continue;
      }else{
        obj.className = 'incorrect';
        // find the correct answer for this question
        this.revelCorrectAnswer(question.choices, question.answerValue, question.id, false);
        this.revelIncorrectAnswer(question.choices, question.id, userAnswerValue);
        index++;
        continue;
      }
    }
    this.determineFailure();
    this.reveled = false;

  }

  revelCorrectAnswer(choices:string[], correctValue:number, id:number, isACorrectAnswer:boolean){
    
    for(let i =0; i<choices.length; i++){
      if(i === correctValue){
        // this index holds the correct answer to the question
        let objQuestion = document.getElementById(choices[i]+id.toString());
        if(objQuestion){
          objQuestion.className = 'correctAnswer';
        }

        let objDisplay = document.getElementById('display'+choices[i]+id.toString());
        if(objDisplay){
          objDisplay.innerHTML = 'This is the correct answer';
          objDisplay.innerHTML = (isACorrectAnswer) ? "*Your selected answer is correct*" : "This is the correct answer";
        }
        return;
      }
    }

  }

  revelIncorrectAnswer(choices:string[], id:number, userValue:number){
    for(let i =0; i< choices.length; i++){
      if(i === userValue){
        // this is the incorrect answer the user picked
        let obj = document.getElementById(choices[i]+id.toString());
        if(obj){
          obj.className = 'wrongAnswer';
        }

        let objDisplay = document.getElementById('display'+choices[i]+id.toString());
        if(objDisplay){
          objDisplay.innerHTML = '*Your selected answer is incorrect*';
        }

        return;
      }
    }
  }

  determineFailure(){
    let totalNumber:number = this.orderedQuestions.length;
    let percentage:number = 0.7;

    let percent:number = totalNumber * percentage;
    percent = Math.ceil(percent);

    if(this.numOfCorrectQuestions >= percent){
    // passed the test
    this.finalGrade = "passed";
    }else{
      this.finalGrade = "failed";
    }

  }

  exitTest(){
    this.route.navigate(['startPage']);
  }

  

}
