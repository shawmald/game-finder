/*
 * Login Component Typescript
 * Author: Shawn Nash
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string; // The username entered by the user
  password!: string; // The password entered by the user
  errorMessage!: string; // Error message to display in case of login failure

  ip = "http://34.30.183.36:80/"; // IP address of the server

  constructor(private router: Router) {}

  // Function to handle the login process
  login(username: string, password: string) {

    // Call the API to validate the login
    fetch(this.ip + "Login?Username=" + username + "&Password=" + password, {
        method: "GET",
    })
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
        // If login is successful, redirect to the dashboard page
        // Otherwise, display an error message
        if (content === "true") {
          // Store the current user in the sessionStorage
          sessionStorage.setItem('currentUser', username);
          sessionStorage.setItem('isLoggedIn', 'true')

          // Redirect to the dashboard page and reload the window
          this.router.navigate(['/gamefinder'])
          .then(() => {
            window.location.reload();
          })
        } else {
          // Display an error message for invalid username or password
          this.errorMessage = 'Invalid username or password';
          alert(this.errorMessage)
        }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Display a generic error message in case of an error
      this.errorMessage = 'Something went wrong, please try again';
      alert(this.errorMessage);
    });
  }

  // Function to initiate the standard login process
  loginStandard() {
    this.login(this.username, this.password);
  }

  // Function to initiate the guest login process
  guestLogin() {
    this.login("Guest", "GuestPassword1234")
  }
}

