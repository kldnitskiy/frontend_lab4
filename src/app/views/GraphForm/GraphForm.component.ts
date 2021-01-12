import {Component, Input, NgZone, OnInit, AfterViewInit,  Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {strict} from 'assert';
import { GlobalConstants } from '../../common/user';
import {catchError, count} from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import {TableComponent} from '../Table/Table.component';
import {Routes, RouterModule, Router} from '@angular/router';


interface X {
  name: number;
}
interface Y {
  name: number;
}
interface Z {
  name: number;
}


@Component({
  selector: 'app-graphform',
  templateUrl: './GraphForm.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host:     {class: 'col-md-6 col-12 app-graphform'},
  styleUrls: ['./GraphForm.component.css']
})

export class GraphFormComponent implements OnInit, AfterViewInit {
  loadAPI: Promise<any>;
  message = 'Hello!';
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) {
      this.x = [
      {name: 3},
      {name: 2},
      {name: 1},
      {name: 0},
      {name: -1},
      {name: -2},
      {name: -3},
      {name: -4},
      {name: -5}
    ];
    // tslint:disable-next-line:no-unused-expression
      this.y;
      this.z = [
      {name: 3},
      {name: 2},
      {name: 1},
      {name: 0},
      {name: -1},
      {name: -2},
      {name: -3},
      {name: -4},
      {name: -5}
    ];
  }

  x: X[];
  selectedX: X[];
  z: Z[];
  selectedZ: Z[];
  selectedY: Y;
  y: Y;
  response: any;
  errors: string;
  buffer: any;
  x_status: boolean;
  y_status: boolean;
  r_status: boolean;
  output: any;

  private ngZone: NgZone;


  public loadScript() {
    let url = 'assets/js/script.js';
    console.log('preparing to load...');
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  sendMessage() {
    this.messageEvent.emit(this.message);
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {

    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'ENIGMA ' + localStorage.getItem('token')
      },

    );
    const username = localStorage.getItem('username');
    const group_number = localStorage.getItem('group_number');
    $('.author_name').text(username);
    $('.author_group').text(group_number);

    // @ts-ignore
    this.http.get('rest/users/get-session', {headers, responseType: 'application/json', observe: 'response'})
      .pipe(catchError(err => {
        if (err.status === 401){
          window.location.href = 'login';
        }
        throw err;
      }))
  .subscribe((response: any) => {
    console.log(JSON.parse(response.body));
    if (JSON.parse(response.body).status === 'error'){
      window.location.href = 'login';
    }
    // tslint:disable-next-line:variable-name
    if (JSON.parse(response.body).status === 'success'){
      $('.author_pic').css('background-image', 'url(https://eu.ui-avatars.com/api/?name=' + encodeURIComponent(username) + '&size=512&background=007bff&color=FFFFFF&bold=true)');
    }
    });

  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit(){
    const canvas = document.querySelector('#render');
    canvas.addEventListener('mousedown', function(e) {
      // @ts-ignore
      getMousePosition(canvas, e);
    });
    // @ts-ignore
    optimizeTable();

    // @ts-ignore
    drawGraph();

    $('.btn-r:eq(0)').click(function (){
      // @ts-ignore
      r = 1;
      // @ts-ignore
      reDraw();
    });
    $('.btn-r:eq(1)').click(function (){
      // @ts-ignore
      r = 2;
      // @ts-ignore
      reDraw();
    });
    $('.btn-r:eq(2)').click(function (){
      // @ts-ignore
      r = 3;
      // @ts-ignore
      reDraw();
    });

    $('.btn-clear').click(function (){
      // @ts-ignore
      clearCanvas();
    });
    // @ts-ignore
    clearCanvas();
    // @ts-ignore
    points = [];
  }

  saveX(newValue) {
    this.selectedX = newValue;
    if (typeof this.selectedX === 'undefined' || this.selectedX.length === 0){
      this.errors = 'Введите X';
      this.x_status = false;
    }else{
      this.errors = '';
      this.x_status = true;
    }

  }
  saveY(newValue: any) {
    this.selectedY = newValue;
    if (newValue == ''){
      this.errors = 'Введите Y';
      this.y_status = false;
    }else if (Math.abs(parseFloat(newValue)) > 3) {
      this.errors = 'Координата Y не валидна';
      this.y_status = false;
    }else{
      this.errors = '';
      this.y_status = true;
    }

  }

  saveR(newValue) {
    this.selectedZ = newValue;
    if (typeof this.selectedZ === 'undefined' || this.selectedZ.length === 0 || !this.validateRadius()){
      if (this.validateRadius()){
        this.errors = 'Введите R';
      }

      this.r_status = false;
    }else{
      this.errors = '';
      this.r_status = true;
    }
  }

exit(){
  localStorage.clear();
  //@ts-ignore
  this.router.navigate(['/login']);
}

validateRadius(){
    if(this.selectedZ !== undefined){
      for (let i = 0; i < this.selectedZ.length; i++){
        if (this.selectedZ[i].name <= 0){
          this.errors = 'Радиус не может быть отрицательным или нулём';
          return false;
        }
      }
      return true;
    }else{
      this.errors = 'Радиус не выбран';
      return false;
    }

}


  sendData() {
      if (this.r_status && this.y_status && this.x_status){
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', Accept: '*/*', Authorization: 'ENIGMA ' + localStorage.getItem('token')}, );

        let tmp = [];
        let x;
        let r;
        // serialize x
        for (let i = 0; i < this.selectedX.length; i++){
          const index = this.selectedX[i].name;
          tmp.push(this.selectedX[i].name);
        }
        x = tmp;

        tmp = [];

        // serialize r
        for (let i = 0; i < this.selectedZ.length; i++){
          tmp.push(this.selectedZ[i].name);
        }
        r = tmp;
        for (let i = 0; i < x.length; i++){
          for (let a = 0; a < r.length; a++){
            // @ts-ignore
            drawDot(x[i], this.selectedY, r[a], false);
            // @ts-ignore
            savePoints(x[i], this.selectedY, r[a], true);
          }
        }


        x = x.join(',');
        r = r.join(',');
        // tslint:disable-next-line:max-line-length
        // @ts-ignore
        this.http.post('rest/points/save', 'x=' + x + '&y=' + this.selectedY + '&r=' + r + '&username=' + localStorage.getItem('username'), {headers, responseType: 'application/json', observe: 'response'})
          .pipe(catchError(err => {
            if (err.status === 401){
              window.location.href = 'login';
            }
            throw err;
          }))
          .subscribe((response: any) => {
            // rendering
            const message = JSON.parse(response.body);
            this.errors = message.message;
            this.messageEvent.emit(this.message);
          });
      }else{
        if(this.validateRadius()){
          this.errors = 'Не все данные заполнены';
        }else{
          this.errors = 'Радиус не может быть отрицательным или нулём';
        }

      }
  }





}
