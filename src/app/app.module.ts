import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './views/App/app.component';
import { HeaderComponent } from './views/Header/Header.component';
import {GraphFormComponent} from './views/GraphForm/GraphForm.component';
import {GraphComponent} from './views/Graph/Graph.component';
import {TableComponent} from './views/Table/Table.component';
import {AuthFormComponent} from './views/AuthForm/AuthForm.component';
import {WorkflowComponent} from './views/Workflow/Workflow.component';
import {TextYComponent} from './views/GraphForm/TextY/TextY.component';
import {MultiselectXComponent} from './views/GraphForm/MultiSelectX/MultiselectX.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MultiselectZComponent} from './views/GraphForm/MultiSelectZ/MultiselectZ.component';
import {StartComponent} from './views/Start/Start.component';
import {LoginComponent} from './views/Start/LoginComponent/Login.component';
import {RegisterComponent} from './views/Start/RegisterComponent/Register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {WelcomeComponent} from './views/Start/WelcomeComponent/Welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    HeaderComponent,
    GraphFormComponent,
    GraphComponent,
    TableComponent,
    AuthFormComponent,
    WorkflowComponent,
    TextYComponent,
    MultiselectXComponent,
    MultiselectZComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  username: string;
}
