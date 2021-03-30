import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';
import { Todo } from './../todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList :Todo[] = new Array();
  timeInterval:number = 5;
  constructor(public todoService:TodoService) { }

  ngOnInit(): void {
    this.requestTodo();

  }

  storeTodo(todoRef:any){
    console.log(todoRef);
    this.todoService.storeTodoInfo(todoRef);
  }

  requestTodo(){
    this.todoService.load().subscribe(res => this.todoList = res);
  }

}
