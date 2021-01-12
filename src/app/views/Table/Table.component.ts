import {Component, Input, OnInit, Output} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter} from 'events';
@Component({
  selector: 'app-table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css'],
  host:     {class: 'app-table'},
})

export class TableComponent implements OnInit {


  @Input() childMessage: string;

  output: any;
  constructor(private http: HttpClient) {

  }

  ngOnInit(){
    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'ENIGMA ' + localStorage.getItem('token')
      },

    );
    // @ts-ignore
    this.http.post('rest/points/get', 'username=' + localStorage.getItem('username'), {headers, responseType: 'application/json', observe: 'response'})
      .subscribe((response: any) => {
        this.output = JSON.parse(response.body);
        console.log(JSON.parse(response.body));

      });
  }



  updateTable(){
    const headers = new HttpHeaders(
      {'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'ENIGMA ' + localStorage.getItem('token')
      },

    );
    // @ts-ignore
    this.http.post('rest/points/get', 'username=' + localStorage.getItem('username'), {headers, responseType: 'application/json', observe: 'response'})
      .subscribe((response: any) => {
        this.output = JSON.parse(response.body);

      });
  }

}
