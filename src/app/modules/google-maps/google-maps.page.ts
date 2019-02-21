import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ClubService } from '../../modules/clubs/club.service';
import { Observable } from 'rxjs';
import { Club } from '../../modules/clubs/club';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.page.html',
  styleUrls: ['./google-maps.page.scss'],
})
export class GoogleMapsPage implements OnInit {

  clubs$: Observable<Club[]>;
  lat: number;
  lng: number;
  icon = {
    url: '/assets/img/ODN-Marker.png',
    scaledSize: {
      height: 50,
      width: 50
    }
  };

  constructor(private platform: Platform, private clubService: ClubService, private geolocation: Geolocation) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.getUserLocation();
    this.clubs$ = this.clubService.getData();
  }

  async getUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error geting location', error);
    });
  }

}
