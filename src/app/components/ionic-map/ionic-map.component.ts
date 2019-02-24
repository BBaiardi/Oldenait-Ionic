import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// tslint:disable-next-line:max-line-length
import { GoogleMap, GoogleMaps, GoogleMapsEvent, Marker, Environment, LatLng, GoogleMapsAnimation, CameraPosition, ILatLng } from '@ionic-native/google-maps/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../../modules/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-ionic-map',
  templateUrl: './ionic-map.component.html',
  styleUrls: ['./ionic-map.component.scss']
})
export class IonicMapComponent implements OnInit {

  map: GoogleMap;
  clubId: string;

  constructor(private platform: Platform,
   private afs: AngularFirestore,
   private auth: AuthService) { }

  async ngOnInit() {
    this.platform.ready();
    this.loadMap();
  }

  /*ionViewDidLoad() {
    this.loadMap();
  }*/

  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyC8XJSfLdzlAaklluMdj76o7v-rlzbtzEs',
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC8XJSfLdzlAaklluMdj76o7v-rlzbtzEs'
    });

    this.map = GoogleMaps.create('map', {
      'controls': {
        'myLocationButton': true,
        'myLocation': true
      }
    });
    this.map.getMyLocation().then(location => {
      const marker: Marker = this.map.addMarkerSync({
        position: location.latLng,
        title: 'Tu posición'
      });
      const position: CameraPosition<ILatLng> = {
        target: marker.getPosition(),
        zoom: 16
      };
      this.map.animateCamera(position);
    });
    /*this.map.addEventListener('click').subscribe(event => {
      this.placeMarkerAndPanTo(event.latLng, this.map);
    });*/
    /*const marker: Marker = this.map.addMarkerSync({
      position: {
        lat: 43,
        lng: -89
      },
      title: 'Ionic'
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('Hola');
    });*/
    this.auth.user$.subscribe(user => {
      if (user) {
        this.clubId = user.clubId;
      }
    });
    this.map.addEventListenerOnce(GoogleMapsEvent.MAP_CLICK).then((params: any[]) => {
      const latLng: LatLng = params[0];
      const coords: Array<number> = [latLng.lat, latLng.lng];
      const marker: Marker = this.map.addMarkerSync({
        position: latLng,
        title: 'Aquí se encuentra tu boliche!',
        animation: GoogleMapsAnimation.DROP
      });
      marker.showInfoWindow();
      this.afs.doc(`clubs/${this.clubId}`).set({
        latitude: coords[0],
        longitude: coords[1]
      }, {
        merge: true
      }).catch(err => {
        console.log(err);
      });
    });

  }

}
