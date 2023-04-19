/* profile component typescript */

import { Component, Inject } from '@angular/core';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  sameUser: boolean = (this.currentUser == this.username );

  editing: boolean = false;

  pfp: string = "";
  displayName: string = "display name";

  email: string = "example@gmail.com";
  emailVis: string = "Private";                //email visibility: Public, Friends Only, or Private

  location: string = "City, ST";
  locationVis: string = "Friends Only";        //location visibility: Public, Friends Only, or Private

  status: string = "Looking for Campaign";

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

    for( let tag of map.keys() ){     //for each tag:
      if( map.get( tag ) ){           //if tag is true:
        filtered.push( tag );         //add tag to list
      }
    }

    return filtered;
  }
  /*
  constructor( public dialog: MatDialog ){}

  openDialog(): void {
    const dialogRef = this.dialog.open( TagEditingDialog, {
      width: "50%"//,
      //data: 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log( "The dialog was closed" );
      //this.?? = result;
    })
  }
  */


}

/*
@Component({
  selector: 'app-tag-editing-dialog',
  templateUrl: './tag-editing-dialog.html',
})
export class TagEditingDialog {
  constructor( 
    public dialogRef: MatDialogRef<TagEditingDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
*/