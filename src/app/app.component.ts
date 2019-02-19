import { Component } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(public auth: AuthService,
    public db: DbService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar ) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  }

  logout() {
    return this.auth.logout();
  }

}
