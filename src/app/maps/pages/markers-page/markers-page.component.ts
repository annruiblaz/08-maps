import { Component, ElementRef, ViewChild } from '@angular/core';

import maplibregl, { LngLat, Marker, Map } from 'maplibre-gl';

import { MarkerAndColor, PlainMarker } from '../../interfaces/interfaces';

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

    if(!this.divMap) {
      throw 'El elemento html no se pudo encontrar.';
    }

    if(typeof window !== 'undefined') {
      this.map = new maplibregl.Map({
        container: this.divMap.nativeElement,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [0, 0],
        zoom: 3
      });

      this.readFromLocalStorage();
  
      const markerHtml = document.createElement('div');
      markerHtml.innerHTML = 'Valencia';
  
      const marker = new Marker({
        color: 'blue',
        element: markerHtml,
      })
        .setLngLat(this.currentlngLat)
          .addTo(this.map);
    }
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
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker(index: number):void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 10,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage():void {
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage():void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }

}
