/*
 * About Component Typescript
 * Author: Shawn Nash
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  // used to open a new tab to the given website without taking the user away from GameFinder
  openSite(url: string) {
    window.open(url, "_blank");
  }
}
