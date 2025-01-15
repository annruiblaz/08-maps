import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{
  @ViewChild('map',{static: false})
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    console.log(this.divMap);

    if(!this.divMap) {
      throw 'El elemento html no se pudo encontrar.';
    }

    const map = new maplibregl.Map({
      container: this.divMap.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });
  }

}
