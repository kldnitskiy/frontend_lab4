import {Component} from '@angular/core';
import { faBars, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './Header.component.html',
  host:     {'class': 'col-12'},
  styleUrls: ['./Header.component.css']
})

export class HeaderComponent {
  MenuIcon = faBars;
  SignOutIcon = faSignOutAlt;
}
