import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isAdmin: any = null;

  constructor(public authService: AuthService) {
    this.getCurrentUser();
   }

  ngOnInit() {
  }

  getCurrentUser() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.isAdmin = user.roles.admin;
      }
    });
  }

}
