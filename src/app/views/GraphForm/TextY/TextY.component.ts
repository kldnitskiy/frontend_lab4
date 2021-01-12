import {InputTextModule} from 'primeng/inputtext';
import {Component, Input, Output} from '@angular/core';

@Component({
  selector: 'app-text-y',
  templateUrl: './TextY.component.html'
})

export class TextYComponent {
  @Output() selectedY: number;
}
