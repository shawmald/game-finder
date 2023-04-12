import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser: string = "test";
  username: string = "test";

  pfp: string = "";
  displayName: string = "test";
  contactInformation: string = "test@gmail.com";
  location: string = "Sarasota, FL";
  status: string = "Looking for Campaign";
  /*tags: ?? = ??;*/
  bio: string = "laksjdflaslkhnvlaskjflaksjdiehgalkdjflkajdfladksjglkaghlksjfleihaglkdnvlajeoiajf";
  timezone: string = "EDT(UTC-4)";
  /*availability: ?? = ??;*/

  /*characters: Character[] = [];*/

  getPFP(): string {
    var dataURI = "";
    // convert the base64 string to a data URI
    if(!this.pfp.startsWith("data:image/png;base64")){
      dataURI = `data:image/png;base64,${this.pfp}`;
    } else {
      dataURI = this.pfp;
    }
  
    return dataURI;
  }

}
