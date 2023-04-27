import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username!: string;
  displayname!: string;
  password!: string;
  user: any;
  errorMessage!: string;

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signup(this.user.email, this.user.email, this.user.id);
      //console.log(this.user);
    })
  }

  signup(username: string, displayname: string, password: string) {

    const ip = "http://34.30.183.36:80/"

    fetch(ip + "SignIn?Username=" + username + "&DisplayName=" + displayname + "&Password=" + password, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Netword response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      if (content === 'true') {
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['gamefinder'])
        .then(() => {
          window.location.reload();
        })
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
        alert(this.errorMessage);
      }
    });
  }

  signupStandard() {
    this.signup(this.username, this.displayname, this.password);
  }
}
