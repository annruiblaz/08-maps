import { Marker } from "maplibre-gl";

export interface MenuItem {
  name: string;
  route: string;
}

export interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}

export interface MarkerAndColor {
  color: string;
  marker: Marker
}

export interface PlainMarker {
  color: string;
  lngLat: number[];
}