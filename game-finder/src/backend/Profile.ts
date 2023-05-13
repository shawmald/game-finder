/**
 * This is profile where it has two constructors, one for logging in and one for signing in. The signing in constructor
 * makes a new document in MongoDB and also creates a new object to put into Array<Profile> for ProfilesManagement, and 
 * logging in just creates a new profile object with all of the stored information in MongoDB.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */



import { MongoDB } from "./mongoDB";
import { CharSheet } from "./CharSheet";
import { Spell } from "./Spell";
import { DMScreen } from "./DMScreen";

export class Profile {

    //Need to have a token so that the profiles can be more secure
    private displayName;
    private username;
    private password;
    private privacyLvl;
    private email : string = "";
    private location : string = null as any;   
    private status : string = null as any;     
    private tags : Array<string> = null as any;   
    private aboutMe : string = null as any;    
    private pfp : string = null as any;   
    private availableTime : string = null as any;  
    private timezone : string = "";
    private blockedProfiles = new Array();
    private friends = new Array();
    private charSheets = new Array();
    private db : MongoDB;
    private DMSCreen! : DMScreen;
 
    public constructor(displayName : string, email : string, username : string, password : string, db : MongoDB);  //Constructor for signing up
    public constructor(username : string, password : string, db : MongoDB);    //Constructor for logging in

    constructor(...arr: any[] ) {

        if(arr.length == 5){
            this.displayName = arr[0];
            this.email = arr[1];
            this.username = arr[2];
            this.password = arr[3];
            this.db = arr[4];
            this.privacyLvl = "Public";
            this.DMSCreen = new DMScreen( arr[2], arr[4] );
            this.saveToDB();
        }
        else{
            this.username = arr[0];
            this.password = arr[1];
            this.db = arr[2];
            this.DMSCreen = new DMScreen( arr[0], arr[2] );
            this.getUserDBInfo();
        }
    }



    async saveToDB(){
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        collection.insertOne( {"Username" : this.username, "Password" : this.password, "PrivacyLevel" : this.privacyLvl, 
        "CharacterSheets" : this.charSheets, "DisplayName" : this.displayName, "BlockedProfiles" : this.blockedProfiles,
        "Friends" : this.friends, "Email" : this.email, "Location" : this.location, "Status" : this.status, "Tags" : this.tags,
        "AboutMe" : this.aboutMe, "PFP" : this.pfp, "AvailableTime" : this.availableTime, "Timezone" : this.timezone} );
    }

    /**
     * 
     */
    public async getUserDBInfo() {
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne( {Username : this.username} );

        this.displayName = doc.DisplayName;
        this.privacyLvl = doc.PrivacyLevel;
        this.charSheets = doc.CharacterSheets;
        this.blockedProfiles = doc.BlockedProfiles;
        this.friends = doc.Friends;
        this.email = doc.Email;
        this.location = doc.Location;
        this.status = doc.Status;
        this.tags = doc.Tags;
        this.aboutMe = doc.AboutMe;
        this.pfp = doc.PFP;
        this.availableTime = doc.AvailableTime;
        this.timezone = doc.Timezone;
    }



    public editInformation(displayName : string, email : string, password : string, privacyLvl : string, blockedProfiles : Array<string>, 
    friends : Array<string>, location : string, status : string, tags : Array<string>, aboutMe : string, pfp : string, availableTime : string,
    timezone : string) {
        this.displayName = displayName;
        this.email = email;
        this.password = password;
        this.privacyLvl = privacyLvl;
        this.blockedProfiles = blockedProfiles;
        this.friends = friends;
        this.location = location;
        this.status = status;
        this.tags = tags;
        this.aboutMe = aboutMe;
        this.pfp = pfp;
        this.availableTime = availableTime;
        this.timezone = timezone;

        this.updateDB();
    }

    public updateDB() {
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "DisplayName", this.displayName);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Email", this.email);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Password", this.password);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "PrivacyLevel", this.privacyLvl);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "BlockedProfiles", this.blockedProfiles);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Friends", this.friends);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Location", this.location);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Status", this.status);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Tags", this.tags);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "AboutMe", this.aboutMe);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "PFP", this.pfp);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "AvailableTime", this.availableTime);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Timezone", this.timezone);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "CharacterSheets", this.charSheets );
    }



    //For profiles would I have it be something like calling the profile, then looking at the different character sheets
    //and going from that or should I just call the character sheets and have spells modified from that ?
    public createCharSheet(charName : string){

        let newSheet = new CharSheet(charName);
        this.addCharacterSheet(newSheet);
        this.updateDB();
    }

    public addCharacterSheet(newSheet : CharSheet) {
        this.charSheets.push(newSheet);
    }

    public updateCharSheet(charSheet : CharSheet, charName : string, race : string, charClass : string, charSubClass : string, lvl : string, allignment : string){
        charSheet.editInformation(charName, race, charClass, charSubClass, lvl, allignment);
        this.updateDB();
    }

    public accessCharacterSheet(pos : number) {
        if(this.charSheets[pos] != null) {
            return this.charSheets[pos];
        }
        else {
            return "The character sheet at this position is null";
        }
    }

    public addFriend(friend : string) {
        this.friends.push(friend);
    }

    public removeFriend(friend : string) {
        //Got code from this https://stackoverflow.com/questions/15292278/how-do-i-remove-an-array-item-in-typescript
        const index = this.friends.indexOf(friend, 0);
        if (index > -1) {
            this.friends.splice(index, 1);
        }

    }

    public addBlocked(block : string) {
        this.blockedProfiles.push(block);
    }

    public removeBlocked(block : string) {
        const index = this.blockedProfiles.indexOf(block, 0);
        if (index > -1) {
            this.blockedProfiles.splice(index, 1);
        }
    }

    public setMongoDB(mongo : MongoDB) {
        this.db = mongo;
    }

    public returnDisplayName() {
        return this.displayName;
    }

    public returnUsername() {
        return this.username;
    }

    public returnPassword() {
        return this.password;
    }

}