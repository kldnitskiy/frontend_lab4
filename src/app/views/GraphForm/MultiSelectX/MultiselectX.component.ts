import {MultiSelectModule} from 'primeng/multiselect';
import {Component, Input, Output} from '@angular/core';
import {EventEmitter} from 'events';

interface X {
  name: string;
}

@Component({
  selector: 'app-multiselect-x',
  templateUrl: './MultiselectX.component.html'
})
export class MultiselectXComponent {
  x: X[];
  selectedX: X[];
  @Output() messageX = new EventEmitter<string>();
  constructor() {
    this.x = [
      {name: '-5'},
      {name: '-4'},
      {name: '-3'},
      {name: '-2'},
      {name: '-1'},
      {name: '0'},
      {name: '1'},
      {name: '2'},
      {name: '3'}
    ];
  }

  sendX() {
    this.messageX.emit(this.selectedX);
  }
}
