import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  ip = "http://34.30.183.36:80/";

  current_username = sessionStorage.getItem('currentUser');

  user: any = {
    username: '',
    email: '',
    timezone: ''
  };

  password: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  errorMessage!: string;
  showChangeUsernameForm: boolean = false;
  showChangeEmailForm: boolean = false;
  showChangeTimezoneForm: boolean = false;
  showChangePasswordForm: boolean = false;

  timeZones: { value: string, label: string}[] = [];

  ngOnInit() {
    this.populate_timeZones();
  }

  toggleChangeUsername() {
    this.showChangeUsernameForm = !this.showChangeUsernameForm;
    this.cancelChangeEmail();
    this.cancelChangeTimezone();
    this.cancelChangePassword();
  }

  cancelChangeUsername() {
    this.showChangeUsernameForm = false;
    this.user = {};
  }

  toggleChangeEmail() {
    this.showChangeEmailForm = !this.showChangeEmailForm;
    this.cancelChangeUsername();
    this.cancelChangeTimezone();
    this.cancelChangePassword();
  }

  cancelChangeEmail() {
    this.showChangeEmailForm = false;
    this.user = {};
  }

  toggleChangeTimezone() {
    this.showChangeTimezoneForm = !this.showChangeTimezoneForm;
    this.cancelChangeUsername();
    this.cancelChangeEmail();
    this.cancelChangePassword();
  }

  cancelChangeTimezone() {
    this.showChangeTimezoneForm = false;
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
    // Logic to save profile settings
    if(this.user.username != null) {
      console.log("current username:", this.current_username)
      console.log("new username:", this.user.username)
      fetch(this.ip + "SetProfileVar?Username=" + this.current_username
      + "&ReqVar=" + "username"
      + "&NewVar=" + this.user.username, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong, please try again.'
      });
      this.toggleChangeUsername();
    }

    if(this.user.email != null) {
      fetch(this.ip + "SetProfileVar?Username=" + this.current_username
      + "&ReqVar=" + "email"
      + "&NewVar=" + this.user.email, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong, please try again.'
      });
      this.toggleChangeEmail();
    }

    if(this.user.timezone != null) {
      fetch(this.ip + "SetProfileVar?Username=" + this.current_username
      + "&ReqVar=" + "timezone"
      + "&NewVar=" + this.user.timezone, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
        this.errorMessage = 'Something went wrong, please try again.'
      });
      this.toggleChangeTimezone();
    }
  }

  changePassword() {
    // Logic to change password
    // check if current password is correct
    fetch(this.ip + "Login?Username=" + this.current_username
    + "&Password=" + this.password.currentPassword, {
      method: "GET",
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      console.log(content)
      if(content === "true") {
        fetch(this.ip + "SetProfileVar?Username=" + this.current_username
        + "&ReqVar=" + "password"
        + "&NewVar=" + this.password.newPassword, {
          method: "GET",
        })
        .catch((error) => {
          console.error('Error:', error);
          this.errorMessage = 'Something went wrong, please try again.'
        });

        this.toggleChangePassword();
      } else {
        alert("Incorrect password, please try again.")
      }
    })
    .catch((error) => {
      console.error('Error:',error);
      this.errorMessage = 'Something went wrong, please try again.'
    })
  }

  populate_timeZones() {
    this.timeZones =
    [
      { value: "UTC-12:00", label: "(UTC-12:00) International Date Line West" },
      { value: "UTC-11:00", label: "(UTC-11:00) Coordinated Universal Time-11" },
      //{ value: "UTC-10:00", label: "(UTC-10:00) Aleutian Islands" },
      { value: "UTC-10:00", label: "(UTC-10:00) Hawaii" },
      { value: "UTC-09:30", label: "(UTC-09:30) Marquesas Islands" },
      { value: "UTC-09:00", label: "(UTC-09:00) Alaska" },
      //{ value: "UTC-09:00", label: "(UTC-09:00) Coordinated Universal Time-09" },
      //{ value: "UTC-08:00", label: "(UTC-08:00) Baja California" },
      //{ value: "UTC-08:00", label: "(UTC-08:00) Coordinated Universal Time-08" },
      { value: "UTC-08:00", label: "(UTC-08:00) Pacific Time (US & Canada)" },
      //{ value: "UTC-07:00", label: "(UTC-07:00) Arizona" },
      //{ value: "UTC-07:00", label: "(UTC-07:00) La Paz, Mazatlan" },
      { value: "UTC-07:00", label: "(UTC-07:00) Mountain Time (US & Canada)" },
      //{ value: "UTC-07:00", label: "(UTC-07:00) Yukon" },
      //{ value: "UTC-06:00", label: "(UTC-06:00) Central America" },
      { value: "UTC-06:00", label: "(UTC-06:00) Central Time (US & Canada)" },
      //{ value: "UTC-06:00", label: "(UTC-06:00) Easter Island" },
      //{ value: "UTC-06:00", label: "(UTC-06:00) Guadalajara, Mexico City, Monterrey" },
      //{ value: "UTC-06:00", label: "(UTC-06:00) Saskatchewan" },
      //{ value: "UTC-05:00", label: "(UTC-05:00) Bogota, Lima, Quito, Rio Branco" },
      //{ value: "UTC-05:00", label: "(UTC-05:00) Chetumal" },
      { value: "UTC-05:00", label: "(UTC-05:00) Eastern Time (US & Canada)" },
      //{ value: "UTC-05:00", label: "(UTC-05:00) Haiti" },
      //{ value: "UTC-05:00", label: "(UTC-05:00) Havana" },
      //{ value: "UTC-05:00", label: "(UTC-05:00) Indiana (East)" },
      //{ value: "UTC-05:00", label: "(UTC-05:00) Turks and Caicos" },
      //{ value: "UTC-04:00", label: "(UTC-04:00) Asuncion" },
      { value: "UTC-04:00", label: "(UTC-04:00) Atlantic Time (Canada)" },
      //{ value: "UTC-04:00", label: "(UTC-04:00) Caracas" },
      //{ value: "UTC-04:00", label: "(UTC-04:00) Cuiaba" },
      //{ value: "UTC-04:00", label: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan" },
      //{ value: "UTC-04:00", label: "(UTC-04:00) Santiago" },
      { value: "UTC-03:30", label: "(UTC-03:30) Newfoundland" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Araguaina" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Brasilia" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Cayenne, Fortaleza" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) City of Buenos Aires" },
      { value: "UTC-03:00", label: "(UTC-03:00) Greenland" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Montevideo" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Punta Arenas" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Saint Pierre and Miquelon" },
      //{ value: "UTC-03:00", label: "(UTC-03:00) Salvador" },
      { value: "UTC-02:00", label: "(UTC-02:00) Coordinated Universal Time-02" },
      //{ value: "UTC-01:00", label: "(UTC-01:00) Azores" },
      { value: "UTC-01:00", label: "(UTC-01:00) Cabo Verde Is." },
      { value: "UTC"      , label: "(UTC) Coordinated Universal Time" },
      { value: "UTC+00:00", label: "(UTC+00:00) Dublin, Edinburgh, Lisbon, London" },
      //{ value: "UTC+00:00", label: "(UTC+00:00) Monrovia, Reykjavik" },
      //{ value: "UTC+00:00", label: "(UTC+00:00) Sao Tome" },
      //{ value: "UTC+01:00", label: "(UTC+01:00) Casablanca" },
      //{ value: "UTC+01:00", label: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna" },
      //{ value: "UTC+01:00", label: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague" },
      //{ value: "UTC+01:00", label: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris" },
      //{ value: "UTC+01:00", label: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb" },
      { value: "UTC+01:00", label: "(UTC+01:00) West Central Africa" },
      { value: "UTC+02:00", label: "(UTC+02:00) Athens, Bucharest" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Beirut" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Cairo" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Chisinau" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Damascus" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Gaza, Hebron" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Harare, Pretoria" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Jerusalem" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Juba" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Kaliningrad" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Khartoum" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Tripoli" },
      //{ value: "UTC+02:00", label: "(UTC+02:00) Windhoek" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Amman" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Baghdad" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Istanbul" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Kuwait, Riyadh" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Minsk" },
      { value: "UTC+03:00", label: "(UTC+03:00) Moscow, St. Petersburg" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Nairobi" },
      //{ value: "UTC+03:00", label: "(UTC+03:00) Volgograd" },
      { value: "UTC+03:30", label: "(UTC+03:30) Tehran" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Abu Dhabi, Muscat" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Astrakhan, Ulyanovsk" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Baku" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Izhevsk, Samara" },
      { value: "UTC+04:00", label: "(UTC+04:00) Port Louis" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Saratov" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Tbilisi" },
      //{ value: "UTC+04:00", label: "(UTC+04:00) Yerevan" },
      { value: "UTC+04:30", label: "(UTC+04:30) Kabul" },
      { value: "UTC+05:00", label: "(UTC+05:00) Ashgabat, Tashkent" },
      //{ value: "UTC+05:00", label: "(UTC+05:00) Ekaterinburg" },
      //{ value: "UTC+05:00", label: "(UTC+05:00) Islamabad, Karachi" },
      //{ value: "UTC+05:00", label: "(UTC+05:00) Qyzylorda" },
      { value: "UTC+05:30", label: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi" },
      //{ value: "UTC+05:30", label: "(UTC+05:30) Sri Jayawardenepura" },
      { value: "UTC+05:45", label: "(UTC+05:45) Kathmandu" },
      { value: "UTC+06:00", label: "(UTC+06:00) Astana" },
      //{ value: "UTC+06:00", label: "(UTC+06:00) Dhaka" },
      //{ value: "UTC+06:00", label: "(UTC+06:00) Omsk" },
      { value: "UTC+06:30", label: "(UTC+06:30) Yangon (Rangoon)" },
      { value: "UTC+07:00", label: "(UTC+07:00) Bangkok, Hanoi, Jakarta" },
      //{ value: "UTC+07:00", label: "(UTC+07:00) Barnaul, Gorno-Altaysk" },
      //{ value: "UTC+07:00", label: "(UTC+07:00) Hovd" },
      //{ value: "UTC+07:00", label: "(UTC+07:00) Krasnoyarsk" },
      //{ value: "UTC+07:00", label: "(UTC+07:00) Novosibirsk" },
      //{ value: "UTC+07:00", label: "(UTC+07:00) Tomsk" },
      { value: "UTC+08:00", label: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi" },
      //{ value: "UTC+08:00", label: "(UTC+08:00) Irkutsk" },
      //{ value: "UTC+08:00", label: "(UTC+08:00) Kuala Lumpur, Singapore" },
      //{ value: "UTC+08:00", label: "(UTC+08:00) Perth" },
      //{ value: "UTC+08:00", label: "(UTC+08:00) Taipei" },
      //{ value: "UTC+08:00", label: "(UTC+08:00) Ulaanbaatar" },
      { value: "UTC+08:45", label: "(UTC+08:45) Eucla" },
      //{ value: "UTC+09:00", label: "(UTC+09:00) Chita" },
      { value: "UTC+09:00", label: "(UTC+09:00) Osaka, Sapporo, Tokyo" },
      //{ value: "UTC+09:00", label: "(UTC+09:00) Pyongyang" },
      //{ value: "UTC+09:00", label: "(UTC+09:00) Seoul" },
      //{ value: "UTC+09:00", label: "(UTC+09:00) Yakutsk" },
      //{ value: "UTC+09:30", label: "(UTC+09:30) Adelaide" },
      { value: "UTC+09:30", label: "(UTC+09:30) Darwin" },
      //{ value: "UTC+10:00", label: "(UTC+10:00) Brisbane" },
      { value: "UTC+10:00", label: "(UTC+10:00) Canberra, Melbourne, Sydney" },
      //{ value: "UTC+10:00", label: "(UTC+10:00) Guam, Port Moresby" },
      //{ value: "UTC+10:00", label: "(UTC+10:00) Hobart" },
      //{ value: "UTC+10:00", label: "(UTC+10:00) Vladivostok" },
      { value: "UTC+10:30", label: "(UTC+10:30) Lord Howe Island" },
      //{ value: "UTC+11:00", label: "(UTC+11:00) Bougainville Island" },
      //{ value: "UTC+11:00", label: "(UTC+11:00) Chokurdakh" },
      //{ value: "UTC+11:00", label: "(UTC+11:00) Magadan" },
      //{ value: "UTC+11:00", label: "(UTC+11:00) Norfolk Island" },
      //{ value: "UTC+11:00", label: "(UTC+11:00) Sakhalin" },
      { value: "UTC+11:00", label: "(UTC+11:00) Solomon Is., New Caledonia" },
      //{ value: "UTC+12:00", label: "(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky" },
      //{ value: "UTC+12:00", label: "(UTC+12:00) Auckland, Wellington" },
      //{ value: "UTC+12:00", label: "(UTC+12:00) Coordinated Universal Time+12" },
      { value: "UTC+12:00", label: "(UTC+12:00) Fiji" },
      { value: "UTC+12:45", label: "(UTC+12:45) Chatham Islands" },
      //{ value: "UTC+13:00", label: "(UTC+13:00) Coordinated Universal Time+13" },
      //{ value: "UTC+13:00", label: "(UTC+13:00) Nuku'alofa" },
      { value: "UTC+13:00", label: "(UTC+13:00) Samoa" },
      { value: "UTC+14:00", label: "(UTC+14:00) Kiritimati Island" }

    ]
  }
}
