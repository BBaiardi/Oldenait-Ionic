import { Component, OnInit } from '@angular/core';
import { ClubService } from '../modules/clubs/club.service';
import { Observable } from 'rxjs';
import { Club } from '../modules/clubs/club';
import { GoogleMap, Environment, GoogleMaps, Marker } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements OnInit {

  map: GoogleMap;
  markers: Marker;

  clubs$: Observable<Club[]>;
  lat: number;
  lng: number;

  constructor(private clubService: ClubService, private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    // await this.loadMap();
    this.clubs$ = this.clubService.getData();
  }

  /*loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBtYacqR_wiRL8YsLoHrhaJHEDkdUsQtvg',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBtYacqR_wiRL8YsLoHrhaJHEDkdUsQtvg'
    });
    this.map = GoogleMaps.create('map_canvas');
    }*/

  }


