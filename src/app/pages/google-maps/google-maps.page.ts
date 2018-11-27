import { Component, OnInit } from '@angular/core';
import { GoogleMap, GoogleMaps, Environment } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {

  map: GoogleMap;

  constructor(private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBtYacqR_wiRL8YsLoHrhaJHEDkdUsQtvg',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBtYacqR_wiRL8YsLoHrhaJHEDkdUsQtvg'
    });
    this.map = GoogleMaps.create('map_canvas');
  }

}
