import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css'],
})
export class Pagina2Component implements AfterViewInit {
  private map: any;
  private initMap(): void {
    this.map = L.map('map', {
      center: [45.36027725126408, 8.174820415729505],
      zoom: 8,
      scrollWheelZoom: true,
    });
    const myIcon = L.icon({
      iconUrl: '../../../assets/IMG/marker5.png',
      iconSize: [30, 30],
    });
    const marker = L.marker([45.36027725126408, 8.174820415729505], {
      icon: myIcon,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        updateWhenZooming: true,
        maxZoom: 15,
        minZoom: 5,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    const wmsLayer = L.tileLayer.wms(
      'https:geomap.reteunitaria.piemonte.it/mapproxy/service?',
      {
        layers: 'regp_sfondo_bdtre_epsg3857',
        format: 'image/png',
        transparent: true,
        attribution: 'WMS Layer Attribution',
      }
    );

    tiles.addTo(this.map);
    wmsLayer.addTo(this.map);
    marker.addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
