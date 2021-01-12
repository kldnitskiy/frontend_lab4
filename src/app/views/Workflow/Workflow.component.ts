import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {TableComponent} from '../Table/Table.component';
import { faPenSquare, faPaperPlane, faTable, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-workflow',
  templateUrl: './Workflow.component.html',
  styleUrls: ['./Workflow.component.css']
})

export class WorkflowComponent{
  message: string;
  @ViewChild(TableComponent) child;
  GraphIcon = faPenSquare;
  FormIcon = faPaperPlane;
  TableIcon = faTable;
  ExitIcon = faSignOutAlt;

  receiveMessage($event) {
    this.message = $event;
    console.log('parent called');
    this.child.updateTable();
  }
}
