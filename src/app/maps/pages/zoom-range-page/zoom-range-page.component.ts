import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import maplibregl, { LngLat } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
  @ViewChild('map',{static: false})
  public divMap?: ElementRef;

  public zoom: number = 5;
  public map?: maplibregl.Map;
  public currentlngLat: LngLat = new LngLat(-2.875, 40.045);
  public lng?: number;
  public lat?: number;

  ngAfterViewInit(): void {

    this.getLngLatForHtml();

      if(!this.divMap) {
        throw 'El elemento html no se pudo encontrar.';
      }
  
      if(typeof window !== 'undefined') {
        this.map = new maplibregl.Map({
          container: this.divMap.nativeElement,
          style: 'https://demotiles.maplibre.org/style.json', // style URL
          center: this.currentlngLat,
          zoom: this.zoom
        });
  
        this.mapListeners();
      }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if(!this.map) throw 'Mapa no inicializado.';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 20) return;
      this.map?.zoomTo(20);
    });

    this.map.on('move', () => {
      this.currentlngLat = this.map!.getCenter();
      this.getLngLatForHtml();
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value?: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }

  getLngLatForHtml() {
    this.lng = parseFloat(this.currentlngLat.lng.toFixed(3));
    this.lat = parseFloat(this.currentlngLat.lat.toFixed(3));
  }

}
