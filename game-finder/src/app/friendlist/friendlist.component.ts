import { Component } from '@angular/core';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent {

  currentUser: string = "";

  friends!: string[];
  blocked!: string[];

  ip = "http://34.30.183.36:80/";

  ngOnInit() {

    this.currentUser = sessionStorage.getItem('currentUser') as string;

    //get currentUser's friendsList
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
      this.friends = JSON.parse(content);
    })
    .catch((error) => {
      console.error('Error:', error);
    })

    //get currentUser's blockList
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
      console.log(content)
      this.blocked = JSON.parse(content);
      console.log(this.blocked)
      for(var friend in this.blocked) {
      console.log(this.blocked[friend])
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }

  unfriend(friend: string) {

    fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + friend
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

  unblock(blockedUser: string) {

    fetch(this.ip + "RemoveFriendOrBlock?Username=" + this.currentUser
    + "&OtherUser=" + blockedUser
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
}
