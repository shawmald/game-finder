/**
 * This is profile where it has two constructors, one for logging in and one for signing in. The signing in constructor
 * makes a new document in MongoDB and also creates a new object to put into Array<Profile> for ProfilesManagement, and 
 * logging in just creates a new profile object with all of the stored information in MongoDB.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */



import { MongoDB } from "./mongoDB";
import { CharSheet } from "./CharSheet";
import {Spell} from "./Spell";

export class Profile {

    //Need to have a token so that the profiles can be more secure
    private displayName;
    private username;
    private password;
    private privacyLvl;
    private email;
    private location : string = null as any;   
    private status : string = null as any;     
    private tags : Array<string> = null as any;   
    private aboutMe : string = null as any;    
    private pfp : string = null as any;   
    private availableTime : string = null as any;  
    private timezone : string = null as any;
    private blockedProfiles = new Array();
    private friends = new Array();
    private charSheets : Array<CharSheet> = null as any;
    private db : MongoDB;
 
    public constructor(displayName : string, email : string, username : string, password : string, db : MongoDB);  //Constructor for signing up
    public constructor(username : string, password : string, db : MongoDB);    //Constructor for logging in

    constructor(...arr: any[] ) {

        if(arr.length == 4){
            this.displayName = arr[0];
            this.email = arr[1];
            this.username = arr[2];
            this.password = arr[3];
            this.db = arr[4];
            this.privacyLvl = "Public";
            this.saveToDB();
        }
        else{
            this.username = arr[0];
            this.password = arr[1];
            this.db = arr[2];
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
        this.charSheets = JSON.parse( doc.CharacterSheets );
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

        this.db.updateDB("ProfilesDB", "Profiles", this.username, "DisplayName", this.displayName);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Email", this.email);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Password", this.password);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "PermissionLevel", this.privacyLvl);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "BlockedProfiles", this.blockedProfiles);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Friends", this.friends);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Location", this.location);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Status", this.status);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Tags", this.tags);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "AboutMe", this.aboutMe);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "PFP", this.pfp);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "AvailableTime", this.availableTime);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Timezone", this.timezone);
    }



    //For profiles would I have it be something like calling the profile, then looking at the different character sheets
    //and going from that or should I just call the character sheets and have spells modified from that ?
    public createCharSheet(charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string, equipment : string,
    stats : Array<number>, statMods : Array<number>, combatStats : Array<number>, money : Array<number>, spells : Array<Spell>, skills : Array<string>,
    pictures : Array<string>){

        let newSheet = new CharSheet(charName, race, background, backstory, lvl, charClass, equipment, stats, statMods, combatStats, money, spells,
        skills, pictures);
        this.addCharacterSheet(newSheet);
    }

    public addCharacterSheet(newSheet : CharSheet) {
        this.charSheets.push(newSheet);
    }

    public updateCharSheet(charSheet : CharSheet, charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string, equipment : string,
    stats : Array<number>, statMods : Array<number>, combatStats : Array<number>, money : Array<number>, spells : Array<Spell>, skills : Array<string>,
    pictures : Array<string>){
        charSheet.editInformation(charName, race, background, backstory, lvl, charClass, equipment, stats, statMods, combatStats, money, spells,
            skills, pictures);
    }

    public accessCharacterSheet(pos : number) {
        if(this.charSheets[pos] != null) {
            return this.charSheets[pos];
        }
        else {
            return "The character sheet at this position is null";
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