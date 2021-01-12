import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from './views/Start/Start.component';
import {AppComponent} from './views/App/app.component';
import {WorkflowComponent} from './views/Workflow/Workflow.component';
import {LoginComponent} from './views/Start/LoginComponent/Login.component';
import {RegisterComponent} from './views/Start/RegisterComponent/Register.component';
import {BrowserModule} from '@angular/platform-browser';
import {WelcomeComponent} from './views/Start/WelcomeComponent/Welcome.component';
import {FormsModule} from '@angular/forms';

const AuthRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

const routes: Routes = [
  {path: '', component: StartComponent, children: AuthRoutes },
  {path: 'main', component: WorkflowComponent}
];




@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [StartComponent, AppComponent];
