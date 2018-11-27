import { Component, OnInit, Input, Renderer2, ElementRef, Inject } from '@angular/core';
import { ClubService } from '../modules/clubs/club.service';
import { Observable } from 'rxjs';
import { Club } from '../modules/clubs/club';
import { GoogleMap, Environment, GoogleMaps } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements OnInit {

  map: GoogleMap;

  clubs$: Observable<Club[]>;
  lat: number;
  lng: number;

  constructor(private clubService: ClubService, private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    this.clubs$ = this.clubService.getData();
  }

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBtYacqR_wiRL8YsLoHrhaJHEDkdUsQtvg',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBtYacqR_wiRL8YsLoHrhaJHEDkdUsQtvg'
    });
    this.map = GoogleMaps.create('map_canvas');
  }

  /*private init(): Promise<any> {
    return new Promise((reso, reje) => {
      this.loadSDK().then(() => {
        this.initMap().then(() => {
          reso(true);
        }, (err) => {
          reject(err);
        });
      }, (err) => {
        reje(err);
      });
    });
  }

  private loadSDK(): Promise<any> {
    console.log('Loading Google Maps SDK');
    return new Promise((reso, reje) => {
      if (!this.mapsLoaded) {
        Network.getStatus().then((status) => {
          if (status.connected) {
            this.injectSDK().then(() => {
              reso(true);
            }, (err) => {
              reject(err);
            });
          } else {
            if (this.networkHandler == null) {
              this.networkHandler = Network.addListener('networkStatusChange', () => {
                if (status.connected) {
                  this.networkHandler.remove();
                  this.init().then((res) => {
                    console.log('Google Maps ready');
                  }, (err) => {
                    console.log(err);
                  });
                }
              });
            }
            reject('Not online');
          }
        }, (err) => {
          if (navigator.onLine) {
            this.injectSDK().then(() => {
              reso(true);
            }, () => {
              reject(err);
            });
          } else {
            reject('Not online');
          }
        });
      } else {
        reject('SDK already loaded');
      }
    });
  }

  private injectSDK(): Promise<any> {
    return new Promise((reso, reje) => {
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        reso(true);
      };
      const script = this.renderer.createElement('script');
      script.id = 'googleMaps';

      if (this.apiKey) {
        script.src = 'https://maps.googleapis.com/maps/js?key=' + this.apiKey +  '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/js?callback=mapInit';
      }
      this.renderer.appendChild(this._document.body, script);
    });
  }

  private initMap() {
    return new Promise((reso, reje) => {
      Geolocation.getCurrentPosition().then((position) => {
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const mapOptions = {
          center: latLng,
          zoom: 15
        };
        this.map = new google.maps.Map(this.element.nativeElement, mapOptions);
        reso(true);
      }, (err) => {
        reject('Could not initialise map');
      });
    });
  }*/

}
