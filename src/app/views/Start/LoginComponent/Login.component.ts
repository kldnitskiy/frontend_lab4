import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { GlobalConstants } from '../../../common/user';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})

export class LoginComponent {
  userName = '';
  password = '';
  loginVerify = false;
  passwordVerify = false;
  response: any;
  constructor(private http: HttpClient, private router: Router) {

  }

    login(){
      const headers = new HttpHeaders(
        {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }, );

      if (this.userName == null || this.userName == '' || typeof this.userName == undefined){
        this.response = 'Введите логин' ;
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
        }else{
          this.response = '';
          this.passwordVerify = true;
        }
      }



      if (this.loginVerify && this.passwordVerify){
        this.response = '';
        this.http.post('rest/users/login', 'username=' + encodeURIComponent(this.userName) + '&pwd=' + this.password, {headers, responseType: 'text', observe: 'response'}).subscribe((response) =>
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
            // window.location.href = "main";
            // @ts-ignore
            this.router.navigate(['/main']);
          }else{
            this.response = message;

          }
        });
      }


    }

}
