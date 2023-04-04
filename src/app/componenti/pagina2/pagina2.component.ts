import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DatiGeoService } from 'src/app/servizio/dati-geo.service';
import { PoligoniGeoService } from 'src/app/servizio/poligoni-geo.service';
@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.component.html',
  styleUrls: ['./pagina2.component.css'],
})
export class Pagina2Component implements OnInit, AfterViewInit {
  constructor(
    private dati: DatiGeoService,
    private poligoni: PoligoniGeoService
  ) {}

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

    this.dati.datiGeo.map((point) => {
      const coordinate = point.geometry.coordinates;
      const info = point.properties;
      const marker = L.marker([coordinate[1], coordinate[0]], {
        icon: myIcon,
      }).addTo(this.map);
      marker.bindPopup(`<b>${info.comune}</b><br>I am a popup.`).openPopup();
    });
    const poligoniLayer = L.layerGroup();
    this.poligoni.poligoniGeo.map((poly) => {
      const coordinate = poly.geometry.coordinates[0].map((item) =>
        L.latLng(item[1], item[0])
      );
      const poligono = L.polygon(coordinate, {
        color: '#2a7c89',
        opacity: 1,
        weight: 2,
        fillColor: '#2a7c89',
      });
      poligoniLayer.addLayer(poligono);
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
    poligoniLayer.addTo(this.map);
  }

  ngOnInit(): void {
    // console.log(this.dati);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
