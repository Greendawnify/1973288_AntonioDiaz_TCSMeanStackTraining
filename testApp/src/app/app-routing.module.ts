import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { QuestionComponent } from './question/question.component';
import { EndpageComponent } from './endpage/endpage.component';



const routes: Routes = [
  {path: '\startPage', component:StartpageComponent},
  {path: '\questions', component:QuestionComponent},
  {path: '\endpage', component:EndpageComponent},
  {path:"", redirectTo:'\startPage', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
