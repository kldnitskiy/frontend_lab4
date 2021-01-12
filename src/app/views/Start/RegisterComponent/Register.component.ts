import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {GlobalConstants} from '../../../common/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],


})



export class RegisterComponent {
  userName = '';
  password = '';
  password_repeat = '';
  isu: number;
  group_number = '';
  email = '';
  response: any;
  loginVerify = false;
  passwordVerify = false;
  isuVerify = false;
  emailVerify = false;



  constructor(private http: HttpClient, private router: Router) {

  }
    next(){
      if (this.userName == null || this.userName == '' || typeof this.userName == undefined){
        this.response = 'Введите логин';
        this.loginVerify = false;
      }else if (this.userName.length < 4){
        this.response = 'Логин слишком короткий. Он должен состоять как минимум из 4 символов';
        this.loginVerify = false;
      }else{
        this.response = '';
        this.loginVerify = true;
      }

      if (this.loginVerify){
        if (this.password == null || this.password == '' || typeof this.password == undefined){
          this.response = 'Введите пароль';
          this.passwordVerify = false;
        }else if (this.password.length < 8){
          this.response = 'Пароль слишком слабый. Он должен содержать как минимум восемь символов';
          this.passwordVerify = false;
        }else if (this.password !== this.password_repeat){
          this.response = 'Пароли не совпадают';
          this.passwordVerify = false;
        }else{
          this.response = '';
          this.passwordVerify = true;
        }
      }

      if (this.loginVerify && this.passwordVerify){
        $('.form-slide-1').hide();
        $('.form-slide-2').show();
      }

    }

    back(){
      $('.form-slide-1').show();
      $('.form-slide-2').hide();

  }


    register(){
      const headers = new HttpHeaders(
        {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        Accept: '*/*',
        },
        );

      if (this.isu == null || typeof this.isu == undefined){
        this.response = 'Введите номер ИСУ';
        this.isuVerify = false;
      }else if (this.isu < 6){
        this.response = 'Номер ИСУ слишком короткий. Он должен состоять как минимум из 6 символов';
        this.isuVerify = false;
      }else{
        this.response = '';
        this.isuVerify = true;
      }
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.isuVerify){
        if (this.email == null || this.email == '' || typeof this.email == undefined){
          this.response = 'Введите адрес электронной почты';
          this.emailVerify = false;
        }else if (!re.test(String(this.email).toLowerCase())){
          this.response = 'Почта введена некорректно';
          this.emailVerify = false;
        }else{
          this.response = '';
          this.emailVerify = true;
        }
      }


      if (this.loginVerify && this.passwordVerify && this.isuVerify && this.emailVerify){
        // 'username=' + this.userName + '&pwd=' + this.password + '&pwd_repeat=' + this.password_repeat + '&pwd_repeat=' + this.password_repeat + '&isu=' + this.isu + '&group_number=' + this.group_number + '&email=' + this.email
        this.http.post('rest/users/register', 'username=' + encodeURIComponent(this.userName) + '&pwd=' + encodeURIComponent(this.password) + '&pwd_repeat=' + encodeURIComponent(this.password_repeat) + '&pwd_repeat=' + this.password_repeat + '&isu=' + this.isu + '&group_number=' + this.group_number + '&email=' + this.email , {headers, responseType: 'text', observe: 'response'}).subscribe((response) =>
        {
          const status = JSON.parse(response.body).status;
          const message = JSON.parse(response.body).message;
          const username = JSON.parse(response.body).username;
          const group_number = JSON.parse(response.body).group_number;
          console.log(response);
          if (status == 'success'){
            localStorage.setItem('token', message);
            localStorage.setItem('username', username);
            localStorage.setItem('group_number', group_number);
            this.router.navigate(['/main']);
          }else{
            this.response = message;
          }
        });
      }





    }


}
