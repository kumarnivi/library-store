import { AfterViewInit, Component, ElementRef, OnInit,NgZone, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit{
  center:google.maps.LatLngLiteral = {lat:24,lng:12}
  map: any;
  markers: any[] = [];
  polyline: any;
  fromLocation!: string;
  toLocation!: string;
  ngZone: any;
  constructor() { }
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('fromInput', { static: true }) fromInput!: ElementRef;
  @ViewChild('toInput', { static: true }) toInput!: ElementRef;

  ngOnInit(): void { 
    this.initMap();
    this.setupPlacesAutocomplete();
   }
  
ngAfterViewInit(): void {
  this.initMap();
}

  initMap(): void {
    const mapProperties = {
      center: new google.maps.LatLng(7.8731, 80.7718), // Default to Sri Lanka coordinates
      zoom: 8
    };
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapProperties);
    } else {
      console.error("Could not find the 'map' element.");
    }
  }

  addMarker(lat: number, lng: number): void {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Marker'
    });
    this.markers.push(marker);
  }

  drawPolyline(path: any[]): void {
    this.polyline = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.polyline.setMap(this.map);
  }
  setupPlacesAutocomplete(): void {
    const autocompleteFrom = new google.maps.places.Autocomplete(this.fromInput.nativeElement);
    autocompleteFrom?.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocompleteFrom?.getPlace();
        this.fromLocation = place.formatted_address;
      });
    });

    const autocompleteTo = new google.maps.places.Autocomplete(this.toInput.nativeElement);
    autocompleteTo?.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocompleteTo?.getPlace();
        this.toLocation = place.formatted_address;
      });
    });
  }

  connectLocations(): void {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: this.fromLocation }, (results:any, status:any) => {
      if (status === 'OK' && results[0]) {
        const fromLatLng = results[0].geometry.location;

        geocoder.geocode({ address: this.toLocation }, (results:any, status:any) => {
          if (status === 'OK' && results[0]) {
            const toLatLng = results[0].geometry.location;

            // Clear existing polyline
            if (this.polyline) {
              this.polyline.setMap(null);
            }

            // Add markers for from and to locations
            this.addMarker(fromLatLng.lat(), fromLatLng.lng());
            this.addMarker(toLatLng.lat(), toLatLng.lng());

            // Draw polyline between from and to locations
            this.polyline = new google.maps.Polyline({
              path: [fromLatLng, toLatLng],
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
            });
            this.polyline.setMap(this.map);

            // Fit map to bounds of markers
            const bounds = new google.maps.LatLngBounds();
            this.markers.forEach(marker => {
              bounds.extend(marker.getPosition());
            });
            this.map.fitBounds(bounds);
          }
        });
      }
    });
  }

}
