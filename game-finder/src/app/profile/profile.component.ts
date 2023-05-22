/*
 * Profile Component Typescript
 * Author: Shawn Nash
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagEditDialogComponent } from '../tag-edit-dialog/tag-edit-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 * Profile Component
 * Displays user profile information and allows editing.
 */
export class ProfileComponent {

  // User Authentication and Basic Information
  isLoggedIn: boolean = false; // Flag to check if user is logged in
  currentUser: string = "";    // Current user's username
  username: string = "";       // Profile username being viewed
  sameUser: boolean = false;  // Flag to check if current user is viewing own profile

  // Edit Mode Flag
  editing: boolean = false; // Flag to indicate if the profile is in edit mode

  // Profile Details
  pfp: string = "";                         // Profile picture encoded data
  displayName: string = "";                 // Display name
  email: string = "";                        // Email address
  location: string = "";                     // Location
  status: string = "Looking for Campaign"; // Current status
  privacyLevel: string = "";                // Privacy level
  blockedProfiles: string[] = [];            // List of blocked profiles
  friendsList: string[] = [];                // List of friends
  bio: string = "about me";                // Biography or 'About Me'
  timezone: string = "";                   // Timezone
  availability: string = "";                 // Availability

  // IP address of the server
  ip = "http://34.30.183.36:80/";

  // Tags
  tags: Map<string,boolean> = new Map<string,boolean>(); // Map of tags with boolean values
  currentTags!: Map<string,boolean>;                     // Temporary copy of tags during editing

  // Availability Time Range
  start_time: string = ""; // Start time for availability
  end_time: string = "";  // End time for availability

  // Friend and Block Status
  isFriend: boolean = false;               // Flag to indicate if the profile is a friend
  isBlocked: boolean = false;              // Flag to indicate if the profile is blocked
  currentUserIsFriend: boolean = false;  // Flag to indicate if the current user is a friend
  currentUserIsBlocked: boolean = false; // Flag to indicate if the current user is blocked by the profile user

  userExists!: boolean; // Flag to indicate if the profile user exists

  ngOnInit(): void {
    // Check if user is logged in
    this.isLoggedIn = (sessionStorage.getItem('isLoggedIn') == 'true')

    // Get the current user
    this.currentUser = sessionStorage.getItem('currentUser') as string;

    // Set the profile username from the route parameters
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.params.subscribe( params => {
      this.username = params['username'];
    })

    // Check if the user exists
    fetch(this.ip + "CheckUser?Username=" + this.username, {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      this.userExists = JSON.parse(content) as boolean;
    })
    .then(() => {
      if(this.userExists) {
        // Get the profile information
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
          // Parse and Set the profile information
          var data = JSON.parse(content)
          this.username = data.username;
          this.displayName = data.displayName;
          this.privacyLevel = data.privacyLvl;
          this.email = data.email;
          this.location = data.location;
          this.status = data.status;
          this.tags = new Map(Object.entries(JSON.parse(data.tags)));
          this.bio = data.aboutMe;
          this.pfp = data.pfp.replace(/ /g, '+');
          this.availability = data.availableTime;
          this.timezone = data.timezone;
          this.blockedProfiles = data.blockedProfiles;
          this.friendsList = data.friends;
        })
        .catch(error => {
          console.error('This User does not exist.', error)
        })

        if(this.currentUser != this.username) {
          // Check if currentUser is Friend of username
          fetch(this.ip + "CheckFriendOrBlock?Username=" + this.username
          + "&OtherUser=" + this.currentUser
          + "&Option=" + "friend", {
            method: "GET",
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            this.currentUserIsFriend = JSON.parse(content) as boolean
          })
          .catch(error => {
            console.error('This User does not exist.', error)
          })

          // Check if currentUser is Blocked from username
          fetch(this.ip + "CheckFriendOrBlock?Username=" + this.username
          + "&OtherUser=" + this.currentUser
          + "&Option=" + "block", {
            method: "GET",
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            this.currentUserIsBlocked = JSON.parse(content) as boolean
          })
          .catch(error => {
            console.error('This User does not exist.', error)
          })

          // Check if username is Friend of currentUser
          fetch(this.ip + "CheckFriendOrBlock?Username=" + this.currentUser
          + "&OtherUser=" + this.username
          + "&Option=" + "friend", {
            method: "GET",
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            this.isFriend = JSON.parse(content) as boolean
          })
          .catch(error => {
            console.error('This User does not exist.', error)
          })

          // Check if username is blocked from currentUser
          fetch(this.ip + "CheckFriendOrBlock?Username=" + this.currentUser
          + "&OtherUser=" + this.username
          + "&Option=" + "block", {
            method: "GET",
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            this.isBlocked = JSON.parse(content) as boolean
          })
          .catch(error => {
            console.error('This User does not exist.', error)
          })
        }

        // Check if the current user is viewing their own profile
        this.sameUser = (this.currentUser == this.username);
      }
    })

}

  /**
   * switch to editing mode,
   * changes editing to true
   */
  edit() {
    this.editing = true;
    this.currentTags = new Map(this.tags);
  }

  /**
   * stop editing, values remain unchanged
   */
  cancel() {
    this.editing = false;

    // save Tags
    fetch(this.ip + "SetProfileVar?Username=" + this.username
    + "&ReqVar=" + "tags"
    + "&NewVar=" + JSON.stringify(Object.fromEntries(this.currentTags)), {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    window.location.reload()
  }

  /**
   * stop editing, save new values and update in database
   */
  save() {

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

    // save Availability
    this.availability = this.start_time + "-" + this.end_time;
    if(this.availability != "") {
      fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "availableTime"
      + "&NewVar=" + this.availability, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
      + "&NewVar=" + JSON.stringify(Object.fromEntries(this.tags)), {
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

    // save PFP
    fetch(this.ip + "SetProfileVar?Username=" + this.username
      + "&ReqVar=" + "pfp"
      + "&NewVar=" + this.pfp, {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    this.editing = false;
  }

  /**
   * sends a friend request to a user
   */
  friend() {

    if(this.isBlocked) {
      fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
      + "&OtherUser=" + this.username
      + "&Option=" + "block", {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:',error)
      })
    }

    fetch(this.ip + "AddFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + this.username
    + "&Option=" + "friend", {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:',error)
    })

    .then(() => {
      window.location.reload()
    })
  }

  unfriend() {

    fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + this.username
    + "&Option=" + "friend", {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:',error)
    })

    .then(() => {
      window.location.reload()
    })
  }

  /**
   * blocks a user
   */
  block() {

    if(this.isFriend) {
      //remove username as friend of currentUser
      fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
      + "&OtherUser=" + this.username
      + "&Option=" + "friend", {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:',error)
      })

      //remove currentUser as friend of username
      fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.username
      + "&OtherUser=" + this.currentUser
      + "&Option=" + "friend", {
        method: "GET",
      })
      .catch((error) => {
        console.error('Error:',error)
      })
    }

    // block
    fetch(this.ip + "AddFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + this.username
    + "&Option=" + "block", {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:',error)
    })

    .then(() => {
      window.location.reload()
    })
  }

  // Function to unblock a user
  unblock() {

    // Server request to unblock a user
    fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + this.username
    + "&Option=" + "block", {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:',error)
    })

    .then(() => {
      window.location.reload()
    })
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

  /*
   * Code to edit the pfp; NON-FUNCTIONAL
   */
  editPFP(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;

        if (width > 128 || height > 128) {
          if (width > height) {
            height = Math.round((height * 128) / width);
            width = 128;
          } else {
            width = Math.round((width * 128) / height);
            height = 128;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx != null) {
          ctx.drawImage(image, 0, 0, width, height);
        }
        const base64String = canvas.toDataURL(file.type);
        this.pfp = base64String;

        event.target.style.display = 'none';
      };

      image.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }


  /*
   * Function to test of method of pfp storage; NON-FUNCTIONAL
   */
  editPFPBinary(event: any) {
    var file = event.target.files[0]
    var reader = new FileReader();
    reader.onloadend = function() {
      //console.log('Encoded Base64 String:', reader.result);

      var data = (<string>reader.result).split(',')[1];
      var binaryBlob = atob(data)
      //console.log('Encoded Binary String:', binaryBlob);
    }
    reader.readAsDataURL(file);
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

  constructor( public dialog: MatDialog, private route: ActivatedRoute, private router: Router ){}

  // Opens the prompt to select profile tags
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
