import { Component } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthService, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready();
    this.splashScreen.hide();
    this.statusBar.styleDefault();
  }
}
