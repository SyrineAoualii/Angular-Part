import {Component} from '@angular/core';
import {User} from "./models/user.models";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {Role} from "./models/role.enum";
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-course-seller';

  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router, private tokenService: TokenService) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    this.tokenService.removeToken();
  }
}
