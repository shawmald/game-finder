import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser: string = "test";
  username: string = "test";

  editing: boolean = false;

  pfp: string = "";
  displayName: string = "display name";
  email: string = "example@gmail.com";
  location: string = "City, ST";
  status: string = "Looking for Campaign";
  /*tags: ?? = ??;*/
  bio: string = "about me";
  timezone: string = "EDT(UTC-4)";
  /*availability: ?? = ??;*/

  /*characters: Character[] = [];*/

  /* TODO insert oninit stuff when login & backend is implemented */

  /**
   * switch to editing mode,
   * changes editing to true
   */
  edit() {
    this.editing = true;
  }

  /**
   * stop editing, values remain unchanged
   */
  cancel() {
    /* TODO reset values if necessary */
    this.editing = false;
  }

  /**
   * stop editing, save new values and update in database
   */
  save() {
    /* TODO save new values, update in database */
    this.editing = false;
  }


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
