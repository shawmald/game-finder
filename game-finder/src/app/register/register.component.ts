import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email!: string;
  username!: string;
  displayname!: string;
  password!: string;
  location!: string;
  timezone!: string;
  availableTime!: string;
  privacyLevel!: string;
  user: any;
  errorMessage!: string;
  showAdditionalFields: boolean = false;

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit() {
    /*
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signup(this.user.email, this.user.email, this.user.id);
      //console.log(this.user);
    })
    */
  }

  signup(username: string, displayname: string, password: string, email: string) {

    const ip = "http://34.30.183.36:80/"

    fetch(ip + "SignIn?Username=" + username
    + "&DisplayName=" + displayname
    + "&Password=" + password
    + "&Email=" + email, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      if (content === 'true') {
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('isLoggedIn', 'true')
        this.showAdditionalFields = true; // Show additional fields after successful signup
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
        alert(this.errorMessage);
      }
    });
  }

  signupStandard() {
    this.signup(this.username, this.displayname, this.password, this.email);
  }

  completeRegistration() {
  const ip = "http://34.30.183.36:80/"

   fetch(ip + "SetProfileVar?Username=" + this.username
   + "&ReqVar=" + "privacyLvl"
   + "&NewVar=" + this.privacyLevel, {
    method: "GET",
   })
   .catch((error) => {
    console.error('Error:', error);
    this.errorMessage = 'Something went wrong, please try again';
   });

   fetch(ip + "SetProfileVar?Username=" + this.username
   + "&ReqVar=" + "availableTime"
   + "&NewVar=" + this.availableTime, {
    method: "GET",
   })
   .catch((error) => {
    console.error('Error:', error);
    this.errorMessage = 'Something went wrong, please try again';
   });

   fetch(ip + "SetProfileVar?Username=" + this.username
   + "&ReqVar=" + "timezone"
   + "&NewVar=" + this.timezone, {
    method: "GET",
   })
   .catch((error) => {
    console.error('Error:', error);
    this.errorMessage = 'Something went wrong, please try again';
   });

   fetch(ip + "SetProfileVar?Username=" + this.username
   + "&ReqVar=" + "location"
   + "&NewVar=" + this.location, {
    method: "GET",
   })
   .catch((error) => {
    console.error('Error:', error);
    this.errorMessage = 'Something went wrong, please try again';
   });

   console.log(this.username)
   /*
   this.router.navigate(['/gamefinder'])
   .then(() => {
    window.location.reload();
   });
   */

  }
}

