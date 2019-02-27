import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// tslint:disable-next-line:max-line-length
import {
  GoogleMap,
  GoogleMaps,
  GoogleMapsEvent,
  Marker,
  Environment,
  LatLng,
  GoogleMapsAnimation,
  CameraPosition,
  ILatLng
} from '@ionic-native/google-maps/ngx';
import {
  Platform
} from '@ionic/angular';
import {
  AuthService
} from '../../modules/auth/auth.service';
import {
  AngularFirestore
} from '@angular/fire/firestore';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-ionic-map',
  templateUrl: './ionic-map.component.html',
  styleUrls: ['./ionic-map.component.scss']
})
export class IonicMapComponent implements OnInit {

  map: GoogleMap;
  mapRef: google.maps.Map;
  mapElement: HTMLElement;
  position;
  clubId: string;

  constructor(private platform: Platform,
    private geo: Geolocation,
    private afs: AngularFirestore,
    private auth: AuthService) {
      this.auth.user$.subscribe(user => {
        if (user) {
          this.clubId = user.clubId;
        }
      });
    }

  async ngOnInit() {
    this.platform.ready();
    if (this.platform.is('cordova')) {
      this.loadMap();
    } else {
      this.loadMapJS();
    }
  }

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
      const position: CameraPosition < ILatLng > = {
        target: marker.getPosition(),
        zoom: 16
      };
      this.map.animateCamera(position);
    });
    this.map.addEventListenerOnce(GoogleMapsEvent.MAP_CLICK).then((params: any[]) => {
      const latLng: LatLng = params[0];
      const coords: Array < number > = [latLng.lat, latLng.lng];
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

  async loadMapJS() {
    this.mapElement = document.getElementById('map');
    const myLocation = await this.getLocation();
    const options = {
      center: myLocation,
      zoom: 15
    };
    this.mapRef = new google.maps.Map(this.mapElement, options);
    this.addMarker(myLocation.lat, myLocation.lng);
    google.maps.event.addListenerOnce(this.mapRef, 'click', (event) => {
      const location = event.latLng;
      const marker = new google.maps.Marker({
        position: location,
        map: this.mapRef
      });
      this.afs.doc(`clubs/${this.clubId}`).set({
        latitude: location.lat(),
        longitude: location.lng()
      }, {
        merge: true
      });
      google.maps.event.addListener(marker, 'click', (e) => {
        const infoWindow = new google.maps.InfoWindow({
          content: 'Aquí se encuentra tu boliche!'
        });
        infoWindow.open(this.mapRef, marker);
      });
    });
  }

  addMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: {
        lat,
        lng
      },
      map: this.mapRef
    });
  }

  async getLocation() {
    const resp = await this.geo.getCurrentPosition();
    return {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    };
  }

}
