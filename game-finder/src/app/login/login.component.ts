import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router) {}

  onSubmit() {

    const ip = "http://34.30.183.36:80/"

    // Call API to validate login
    console.log(this.username + ", " + this.password)
    fetch(ip + "Login?Username=" + this.username + "&Password=" + this.password, {
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
        // If login is successful, redirect to dashboard page
        // Otherwise, display error message
        if (content === "true") {
          // Redirect to dashboard page
          sessionStorage.setItem('currentUser', this.username);
          sessionStorage.setItem('isLoggedIn', 'true')
          this.router.navigate(['/gamefinder'])
          .then(() => {
            window.location.reload();
          })
        } else {
          this.errorMessage = 'Invalid username or password';
          alert(this.errorMessage)
        }
    })
    .catch((error) => {
      console.error('Error:', error);
      this.errorMessage = 'Something went wrong, please try again';
    });
  }
}

