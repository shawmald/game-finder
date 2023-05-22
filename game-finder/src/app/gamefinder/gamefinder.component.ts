import { Component } from '@angular/core';

@Component({
  selector: 'app-gamefinder',
  templateUrl: './gamefinder.component.html',
  styleUrls: ['./gamefinder.component.css']
})
export class GamefinderComponent {
  ip = "http://34.30.183.36:80/";
  currentUser: string = '';

  //usernameArray: Array<String> = [];

  userArray: Array<User> = [];        //all users
  profiles: Array<User> = [];         //filtered users

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('currentUser') as string;

    fetch( this.ip + "ReturnAllUserNames")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      let usernameArray: Array<String> = content.split(", ");
      //this.usernameArray = content.split(", ");
      usernameArray.pop()

      //for each username:
      usernameArray.forEach((username) => {

        //check if current user is blocked
        let blocked: boolean = false;
        fetch( this.ip + "CheckFriendOrBlock?Username=" + username + "&OtherUser=" + this.currentUser + "&Option=block", {
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((content) => {
          if(content == 'true'){
            blocked = true;
          }
        });

        //if not blocked, add info
        if(!blocked){
          var newUser = new User( username );

          // fetch displayName
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=displayName", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            newUser.displayName = content
          });


          // fetch location
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=location", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            newUser.location = content
          });


          // fetch status
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=status", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            newUser.status = content
          });
          

          // fetch tags
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=tags", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            //newUser.tags = content    //convert string to map<string,boolean>
          });
          

          // fetch timezone
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=timezone", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            newUser.timezone = content
          });


          this.userArray.push(newUser);
          
        }

      })
    });
  }
}

export class User {
  username: String = "";
  displayName: String = "";

  status: string = "";
  location: string = "";
  tags!: Map<string, boolean>;
  timezone: string = "";


  constructor( username:String ) {
    this.username = username;
  }

}
