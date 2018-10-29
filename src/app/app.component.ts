import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AuthService } from './auth/auth.service';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    SplashScreen .hide().catch(error => {
      console.error(error);
    });
    StatusBar.hide().catch(error => {
      console.error(error);
    });
  }
}
