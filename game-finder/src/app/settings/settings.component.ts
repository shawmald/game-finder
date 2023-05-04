import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  user: any = {
    username: '',
    email: ''
  };

  password: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  errorMessage!: string;
  showChangeUsernameForm: boolean = false;
  showChangeEmailForm: boolean = false;
  showChangePasswordForm: boolean = false;

  toggleChangeUsername() {
    this.showChangeUsernameForm = !this.showChangeUsernameForm;
    this.cancelChangeEmail();
    this.cancelChangePassword();
  }

  cancelChangeUsername() {
    this.showChangeUsernameForm = false;
    this.user = {};
  }

  toggleChangeEmail() {
    this.showChangeEmailForm = !this.showChangeEmailForm;
    this.cancelChangeUsername();
    this.cancelChangePassword();
  }

  cancelChangeEmail() {
    this.showChangeEmailForm = false;
    this.user = {};
  }

  toggleChangePassword() {
    this.showChangePasswordForm = !this.showChangePasswordForm;
    this.cancelChangeUsername();
    this.cancelChangeEmail();
  }

  cancelChangePassword() {
    this.showChangePasswordForm = false;
    this.password = {}; // Clear the password form fields
  }

  saveProfileSettings() {
    const ip = "http://34.30.183.36:80/";

    const current_username = sessionStorage.getItem('currentUser');

    // Logic to save profile settings
    if(current_username != this.user.username) {
      console.log("current username:", current_username)
      console.log("new username:", this.user.username)
      fetch(ip + "SetProfileVar?Username=" + current_username
      + "&ReqVar=" + "username"
      + "&NewVar=" + this.user.username, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong, please try again.'
      });
    }

    fetch(ip + "SetProfileVar?Username=" + current_username
    + "&ReqVar=" + "email"
    + "&NewVar=" + this.user.email, {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:', error);
      this.errorMessage = 'Something went wrong, please try again.'
    });
  }

  changePassword() {
    const ip = "http://34.30.183.36:80/";

    const current_username = sessionStorage.getItem('currentUser');

    // Logic to change password
    fetch(ip + "SetProfileVar?Username=" + current_username
    + "&ReqVar=" + "password"
    + "&NewVar=" + this.password.newPassword, {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:', error);
      this.errorMessage = 'Something went wrong, please try again.'
    });
  }
}
