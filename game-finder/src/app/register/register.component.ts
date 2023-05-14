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
  start_time!: string;
  end_time!: string;
  timeZones: { value: string, label: string}[] = [];



  constructor(private router: Router) {}

  ngOnInit() {
    this.populate_timeZones();
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

  get_default_timeZone() {
    // Get the current timezone offset in minutes
    var timezoneOffsetMinutes = new Date().getTimezoneOffset();

    // Convert the offset to hours and determine the sign
    var timezoneOffsetHours = Math.abs(timezoneOffsetMinutes / 60);
    var timezoneOffsetSign = timezoneOffsetMinutes < 0 ? "+" : "-";

    // Format the offset in UTC format
    var timezoneOffsetUTC = "UTC" + timezoneOffsetSign + ("00" + timezoneOffsetHours).slice(-2) + ":00";

    return timezoneOffsetUTC
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

        this.timezone = this.get_default_timeZone();
      } else {
        this.errorMessage = 'Something went wrong. Please try again.';
        //alert(this.errorMessage);
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
   + "&NewVar=" + this.start_time + "-" + this.end_time, {
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

   fetch(ip + "SetProfileVar?Username=" + this.username
   + "&ReqVar=" + "pfp"
   + "&NewVar=" + "data:image/png;base64,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".replace(/\+/g, ' '), {
    method: "GET",
   })
   .catch((error) => {
    console.error('Error:', error);
    this.errorMessage = 'Something went wrong, please try again';
   });

   fetch(ip + "SetProfileVar?Username=" + this.username
   + "&ReqVar=" + "aboutMe"
   + "&NewVar=" + "About Me", {
    method: "GET",
   })
   .catch((error) => {
    console.error('Error:', error);
    this.errorMessage = 'Something went wrong, please try again';
   });

   this.router.navigate(['/about'])
   .then(() => {
    window.location.reload();
   });


  }
}

