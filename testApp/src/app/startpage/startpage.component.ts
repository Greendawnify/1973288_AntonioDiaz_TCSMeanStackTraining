import { Component, OnInit } from '@angular/core';
import { QuestionListService } from './../question-list.service';
import { NumberListService } from './../number-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  constructor(
    public qList:QuestionListService,
    public nList:NumberListService,
    public route:Router
    ) { }

  ngOnInit(): void {
    this.qList.loadQuestionDetails();
  }

  startButton(){
    this.nList.createListOfQuestion(this.qList.questions);
    console.log('hi');
    this.route.navigate(['questions']);
  }

}
