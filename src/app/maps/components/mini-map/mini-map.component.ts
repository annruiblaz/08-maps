import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import maplibregl, { Map, Marker } from 'maplibre-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{

  @Input() lngLat?: [number, number];
  @ViewChild('map',{static: false}) public divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit(): void {
    if(!this.divMap) {
      throw "Map can't be found";
    }
    
    if(!this.lngLat) throw "LngLat can't be null";

    if(typeof window !== 'undefined') {
      this.map = new maplibregl.Map({
        container: this.divMap.nativeElement,
        center: this.lngLat,
        style: 'https://demotiles.maplibre.org/style.json',
        zoom: 6,
        interactive: false
      });

      new Marker ().setLngLat(this.lngLat)
        .addTo(this.map);
    }
  }

}
