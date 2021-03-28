import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { StartpageComponent } from './startpage/startpage.component';
import { EndpageComponent } from './endpage/endpage.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    StartpageComponent,
    EndpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
