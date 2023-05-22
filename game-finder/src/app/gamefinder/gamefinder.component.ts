import { Component } from '@angular/core';

@Component({
  selector: 'app-gamefinder',
  templateUrl: './gamefinder.component.html',
  styleUrls: ['./gamefinder.component.css']
})
export class GamefinderComponent {
  ip = "http://34.30.183.36:80/";
  currentUser: string = '';

  columndefs = ['name', 'tags', 'availability', 'location'];
  profiles: Array<User> = [];

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
      let usernameArray: Array<String> = JSON.parse(content);
      //this.usernameArray = content.split(", ");
      //usernameArray.pop();

      //for each username:
      usernameArray.forEach((username) => {

        //check if current user is blocked
        /*
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
          */
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
            newUser.displayName = content;
          });

          // fetch privacy level
          let privacy: string = "Public";
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=privacyLvl", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            privacy = content;
          });

          //check is current user is in friendlist
          let friend: boolean = false;
          fetch( this.ip + "CheckFriendOrBlock?Username=" + username + "&OtherUser=" + this.currentUser + "&Option=friend", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            if(content == 'true'){
              friend = true;
            }
          });

          if( (privacy === "Public") || (privacy === "Friend Olny" && friend) ){

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
              newUser.location = content;
            });

          }

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
            newUser.status = content;
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
            let map: Map<String,number> = JSON.parse(content);    //convert string into an array of tags, split by ,

            for( let tag in map.keys() ){
              if(map.get(tag)){
                newUser.tags.push(tag);
              }
            }
            
          });
          

          // fetch timezone
          fetch( this.ip + "ReturnProfileVar?Username=" + username + "&ReqVar=availability", {
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then((content) => {
            newUser.availability = JSON.parse(content);
          });
          
          this.profiles.push(newUser);
     
          
        //}

      })
    });
  }
}

export class User {
  username: String = "";
  displayName: String = "";

  status: string = "";
  location: string = "";
  tags: Array<String> = [];
  availability: string = "";


  constructor( username:String ) {
    this.username = username;
  }

}
