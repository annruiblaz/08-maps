import { Component, ElementRef, ViewChild } from '@angular/core';
import maplibregl, { LngLat, Marker, Map } from 'maplibre-gl';

export interface MarkerAndColor {
  color: string;
  marker: Marker
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map',{static: false})
  public divMap?: ElementRef;

  public map?: Map;
  public currentlngLat: LngLat = new LngLat(0.3756, 39.4738);
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    console.log(this.divMap);

    if(!this.divMap) {
      throw 'El elemento html no se pudo encontrar.';
    }

    this.map = new maplibregl.Map({
      container: this.divMap.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 3
    });

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'Valencia';

    const marker = new Marker({
      color: 'blue',
      element: markerHtml,
    })
      .setLngLat(this.currentlngLat)
        .addTo(this.map);
  }

  createMarker(): void {
    if(!this.map) return;
    //Creamos un color hexadecimal d manera aleatoria
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    this.currentlngLat = this.map.getCenter();

    this.addMarker(this.currentlngLat, color);
  }

  addMarker(lngLat: LngLat, color: string):void {
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    
    this.markers.push({color, marker});
  }

  deleteMarker(index: number):void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 12,
      center: marker.getLngLat()
    });
  }

}
