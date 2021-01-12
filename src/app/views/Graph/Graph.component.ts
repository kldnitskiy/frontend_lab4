import {Component} from '@angular/core'

@Component({
  selector: 'app-graph',
  templateUrl: './Graph.component.html',
  host:     {'class': 'col-md-6 col-12 app-graph'},
  styleUrls: ['./Graph.component.css']
})

export class GraphComponent {
  graphclass = 'col-md-6';
}
