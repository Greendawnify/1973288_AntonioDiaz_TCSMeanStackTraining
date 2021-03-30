import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList:Todo[] = new Array();
  constructor(public http: HttpClient) { }

  storeTodoInfo(info:any){
    this.http.post('http://localhost:3000/todo', info).
    subscribe(result => console.log(result), error => console.error(error));

    //this.getTodoInfo();
  }

  load():Observable<Todo[]>{
    return this.http.get<Todo[]>('http://localhost:3000/todo');
  }
}
