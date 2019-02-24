import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ionic-Native Plugins
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { GoogleMaps } from '@ionic-native/google-maps/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Environment import for firebaseConfig (credentials)
import { environment } from '../environments/environment';

// AngularFire2 imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// Modules imports
import { EventsModule } from './modules/events/events.module';
import { ClubsModule } from './modules/clubs/clubs.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleMapsPageModule } from './modules/google-maps/google-maps.module';

// Angular Google Maps imports
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

// Angular InstantSearch import
import { NgAisModule } from 'angular-instantsearch';

import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AgmSnazzyInfoWindowModule,
    NgAisModule.forRoot(),
    AuthModule,
    EventsModule,
    ClubsModule,
    GoogleMapsPageModule,
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SplashScreen,
    StatusBar,
    Facebook,
    GooglePlus,
    GoogleMaps,
    Geolocation,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
