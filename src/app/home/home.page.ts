import { Component } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public isAdmin: any;

  constructor(public auth: AuthService) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isAdmin = user.roles.admin;
      }
    });
  }

}
