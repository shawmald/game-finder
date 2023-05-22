/*
 * Logout Component Typescript
 * Author: Shawn Nash
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Clear the sessionStorage
    sessionStorage.clear()

    // Navigate to the login page and reload the window
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    })
  }
}
