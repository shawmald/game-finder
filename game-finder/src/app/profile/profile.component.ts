/* profile component typescript */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagEditDialogComponent } from '../tag-edit-dialog/tag-edit-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 * profile
 */
export class ProfileComponent {

  currentUser: string = "";
  username: string = "";
  sameUser: boolean = false;

  editing: boolean = false;

  pfp: string = "";
  displayName: string = "";
  //displayName: string = "display name";

  email: string = "";
  //email: string = "example@gmail.com";
  emailVis: string = "Private";                //email visibility: Public, Friends Only, or Private

  location: string = "";
  //location: string = "City, ST";
  locationVis: string = "Friends Only";        //location visibility: Public, Friends Only, or Private

  status: string = "Looking for Campaign";
  //status: string = "Looking for Campaign";

  privacyLevel: string = "";

  blockedProfiles: string[] = [];

  friendsList: string[] = [];

  ip = "http://34.30.183.36:80/";

  //hard coded tags for testing, edit later
  tags: Map<string,boolean> = new Map<string,boolean>([
    ["in-person", true],
    ["online", true],

    ["beginner player", false],
    ["experienced player", true],
    ["beginner GM", true],
    ["experienced GM", false],

    ["short", true],
    ["long", true],
    ["sustained", true],
    ["episodic", true],

  ]);

  bio: string = "about me";
  timezone: string = "";
  //timezone: string = "EDT(UTC-4)";
  availability: string = "";

  /*characters: Character[] = [];*/

  /* TODO insert oninit stuff when login & backend is implemented */
  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('currentUser') as string;

    this.username = this.route.snapshot.paramMap.get('username') as string;

    // check for existing user
    fetch(this.ip + "ReturnProfileInformation?Username=" + this.username, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      var data = JSON.parse(content)
      this.username = data.username;
      this.displayName = data.displayName;
      this.privacyLevel = data.privacyLvl;
      this.email = data.email;
      this.location = data.location;
      this.status = data.status;
      //this.tags = data.tags;
      this.bio = data.aboutMe;
      this.pfp = data.pfp;
      this.availability = data.availableTime;
      this.timezone = data.timezone;
      this.blockedProfiles = data.blockedProfiles;
      this.friendsList = data.friends;
      console.log(this.tags);
    })
    .catch(error => {
      console.error('This User does not exist.', error)
    })

    this.sameUser = (this.currentUser == this.username);
  }

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

    // save Display Name
    if(this.displayName != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "displayName"
      + "&NewVar=" + this.displayName, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }

    // save Location
    if(this.location != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "location"
      + "&NewVar=" + this.location, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    // save Status
    if(this.status != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "status"
      + "&NewVar=" + this.status, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }

    // save Tags
    if(this.tags != null) {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "tags"
      + "&NewVar=" + this.tags, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }

    // save Privacy
    if(this.privacyLevel != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "privacyLvl"
      + "&NewVar=" + this.privacyLevel, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    // save Bio
    if(this.bio != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "aboutMe"
      + "&NewVar=" + this.bio, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    }

    // save Timezone
    if(this.timezone != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "timezone"
      + "&NewVar=" + this.timezone, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    this.editing = false;
  }

  /**
   * sends a friend request to a user
   */
  friend() {
    /* TODO send friend request */
  }

  /**
   * blocks a user
   */
  block() {
    /* TODO block user */
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

  /**
   *
   * @param map (Map<string,boolean)
   * @returns (string[])
   */
  filterTags( map: Map<string,boolean>): string[] {
    let filtered = [];

    if(map != null) {
      for( let tag of map.keys() ){     //for each tag:
        if( map.get( tag ) ){           //if tag is true:
          filtered.push( tag );         //add tag to list
        }
      }
    }

    return filtered;
  }

  constructor( public dialog: MatDialog, private route: ActivatedRoute ){}

  openDialog(): void {
    const dialogRef = this.dialog.open( TagEditDialogComponent, {
      width: "350px",
      data: {
        tags: this.tags
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log( "The dialog was closed" );
      //this.?? = result;
    })
  }

}
