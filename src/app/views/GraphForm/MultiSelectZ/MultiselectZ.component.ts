import {MultiSelectModule} from 'primeng/multiselect';
import {Component, Input, Output} from '@angular/core';


interface Z {
  name: string;
}

@Component({
  selector: 'app-multiselect-z',
  templateUrl: './MultiselectZ.component.html'
})
export class MultiselectZComponent {

  z: Z[];
  @Output() selectedZ: Z[];


  constructor() {
    this.z = [
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
}
