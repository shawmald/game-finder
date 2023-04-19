/* navbar typescript */

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

/**
 * navbar
 */
export class NavBarComponent implements OnInit {
  activeLink: string = '';    //displayed in mobile view, shows the user what page they're on
  showDropdown: boolean = false;
  currentUser = sessionStorage.getItem('currentUser');
  isLoggedIn: boolean = false;

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = (sessionStorage.getItem('isLoggedIn') == 'true')
  }

  /**
   * Sets activeLink to value provided.
   * @param activeLink (string)
   */
  setActiveLink( activeLink: string ){
    this.activeLink = activeLink;
  }
  
  // TODO: call on refresh
  updateActiveLink() {
    const path = this.router.url;
    const parts = path.split('/');
    this.activeLink = parts[1];
  }

  /*
  //  dropdown methods no longer necessary?
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  dropdownClick(event: { stopPropagation: () => void; }) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: { target: any; }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }
  */

  @HostListener('window:storage', ['$event'])
  onStorageChange(event: StorageEvent) {
    if (event.storageArea === sessionStorage && event.key === 'currentUser') {
      // The currentUser item has changed, so reload the component
      window.location.reload();
    }
  }
}
