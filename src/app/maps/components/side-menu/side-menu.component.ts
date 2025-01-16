import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/interfaces';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {route: '/maps/fullscreen', name: 'FullScreen'},
    {route: '/maps/zoom-range', name: 'Zoom-Range'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Properties'},
    {route: '/maps/standalone', name: 'Standalone'},

  ]
}
