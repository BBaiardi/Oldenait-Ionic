import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Environment import for firebaseConfig (credentials)
import { environment } from '../environments/environment';

// AngularFire2 imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { EventsModule } from './modules/events/events.module';
import { AuthModule } from './modules/auth/auth.module';
import { GooglemapsComponent } from './googlemaps/googlemaps.component';

// Angular Google Maps imports
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

// Facebook SDK
import { Facebook } from '@ionic-native/facebook/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';

@NgModule({
  declarations: [
    AppComponent,
    GooglemapsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    EventsModule,
    AuthModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
