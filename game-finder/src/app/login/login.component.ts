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
  user: any;
  errorMessage!: string;

  ip = "http://34.30.183.36:80/";

  constructor(private router: Router) {}

  ngOnInit() {
    /**
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.login(this.user.email, this.user.id);
      //console.log(this.user);
    })
    */
  }

  login(username: string, password: string) {

    // Call API to validate login
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
        // If login is successful, redirect to dashboard page
        // Otherwise, display error message
        if (content === "true") {
          // Redirect to dashboard page
          sessionStorage.setItem('currentUser', username);
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
      alert(this.errorMessage);
    });
  }

  loginStandard() {
    this.login(this.username, this.password);
  }
}

