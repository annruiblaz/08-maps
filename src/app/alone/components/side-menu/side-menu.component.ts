import { Component } from '@angular/core';

import { MenuItem } from '../../../maps/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    {route: '/maps/fullscreen', name: 'FullScreen'},
    {route: '/maps/zoom-range', name: 'Zoom-Range'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Properties'},
    {route: '/alone', name: 'Standalone'},

  ]
}
