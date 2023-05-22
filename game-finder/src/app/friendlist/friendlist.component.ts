/*
 * FriendList Component Typescript
 * Author: Shawn Nash
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent {

  currentUser: string = ""; // The currently logged in user

  friends!: string[]; // Array to store the friends of the current user
  blocked!: string[]; // Array to store the blocked profiles of the current user

  isFriendsEmpty: boolean = false; // Flag to indicate if the currentUser's friends list is empty
  isBlockedEmpty: boolean = false; // Flag to indicate if the currentUser's blocked profiles list is empty

  ip = "http://34.30.183.36:80/"; // IP address of the server

  ngOnInit() {

    // Retrieve the logged-in user from the sessionStorage
    this.currentUser = sessionStorage.getItem('currentUser') as string;

    // Fetch the currentUser's friendsList from the server
    fetch(this.ip + "ReturnProfileVar?Username=" + this.currentUser
    + "&ReqVar=" + "friends", {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      // Parse the response content and store it in the friends array
      this.friends = JSON.parse(content);

      // Check if the friends list is empty
      if(Object.keys(this.friends).length === 0) {
        this.isFriendsEmpty = true;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })

    // Fetch the currentUser's blockList from the server
    fetch(this.ip + "ReturnProfileVar?Username=" + this.currentUser
    + "&ReqVar=" + "blockedProfiles", {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      // Parse the response content and store it in the blocked array
      this.blocked = JSON.parse(content);

      // Check if the blocked profiles list is empty
      if(Object.keys(this.friends).length === 0) {
        this.isBlockedEmpty = true;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  // Function to unfriend a friend
  unfriend(friend: string) {

    // Send a request to the server to remove the friend
    fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + friend
    + "&Option=" + "friend", {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:',error)
    })

    .then(() => {
      // Reload the page after unfriending
      window.location.reload()
    })
  }

   // Function to unblock a blocked user
  unblock(blockedUser: string) {

    // Send a request to the server to unblock the user
    fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + blockedUser
    + "&Option=" + "block", {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:',error)
    })

    .then(() => {
      // Reload the page after unblocking
      window.location.reload()
    })
  }
}
