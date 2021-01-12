import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css', './bootstrap.min.css', './app.component.media.css']
})


export class AppComponent {
  title = 'frontend';
}
