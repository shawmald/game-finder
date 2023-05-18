/**
 * The Profile class represents a user profile and provides various functionalities related to profile management.
 * It has two constructors, one for signing up and one for logging in. The signing up constructor creates a new document in MongoDB
 * and adds a new object to the Array<Profile> in ProfilesManagement. The logging in constructor retrieves the stored profile information
 * from MongoDB and creates a new profile object.
 * The Profile class provides the following functions:
 * 
 * saveToDB(): Saves a newly created profile from the signing up constructor to MongoDB.
 * getUserDBInfo(): Retrieves the profile's information from the database by finding a document that matches the username during the initialization of 
 * ProfileManagement.
 * editInformation(): Edits multiple variables of the profile at once instead of modifying them individually.
 * updateDB(): Updates the database document containing the profile's information with any changes made to it.
 * createCharSheet(): Creates a character sheet and adds it to the charSheets array.
 * updateCharSheet(): Updates multiple variables of a character sheet at once instead of modifying them individually.
 * accessCharacterSheet(): Returns a character sheet given its position in the charSheets array. If the character sheet doesn't exist,
 * it returns a string indicating that it doesn't exist.
 * addFriend(): Adds a friend's username to the Friends array.
 * removeFriend(): Removes a friend's username from the Friends array.
 * addBlocked(): Adds a blocked user's username to the blockedProfiles array.
 * removeBlocked(): Removes a blocked user's username from the blockedProfiles array.
 * setMongoDB(): Allows setting MongoDB to null to enable the conversion of an object to a JSON object. It can be set back to the database later.
 * returnDisplayName(): Returns the display name associated with the profile.
 * returnUsername(): Returns the username of the profile.
 * returnPassword(): Returns the password of the profile.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */



import { MongoDB } from "./mongoDB";
import { CharSheet } from "./CharSheet";
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
    private tags! : Map<string, boolean>;  
    private aboutMe! : string;    
    private pfp! : BinaryData;   
    private availableTime : string = null as any;  
    private timezone : string = "";
    private blockedProfiles = new Array();
    private friends = new Array();
    public charSheets = new Array();
    private db : MongoDB;
    private dmScreen! : DMScreen;
 
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
            this.dmScreen = new DMScreen( arr[2], new Array() );
            this.saveToDB();
        }
        else{
            this.username = arr[0];
            this.password = arr[1];
            this.db = arr[2];
            this.getUserDBInfo();
        }
    }

    /**
     * This saves a profile created with the signIn constructor to MongoDB as a document.
     */
    async saveToDB(){
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        collection.insertOne( {"Username" : this.username, "Password" : this.password, "PrivacyLevel" : this.privacyLvl, 
        "CharacterSheets" : this.charSheets, "DisplayName" : this.displayName, "BlockedProfiles" : this.blockedProfiles,
        "Friends" : this.friends, "Email" : this.email, "Location" : this.location, "Status" : this.status, "Tags" : this.tags,
        "AboutMe" : this.aboutMe, "PFP" : this.pfp, "AvailableTime" : this.availableTime, "Timezone" : this.timezone, "DMScreen" : this.dmScreen} );
    }

    /**
     * This returns all of the information from the Profile's document when using the login constructor and sets it to the variables
     * that're inside of this class and converts the characterSheets into CharSheet Objects.
     */
    public async getUserDBInfo() {
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne( {Username : this.username} );

        this.displayName = doc.DisplayName;
        this.privacyLvl = doc.PrivacyLevel;
        //this.charSheets = doc.CharacterSheets;  //Need to eventually change this so it makes a class instead of remaining an obj for fields.
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


        let dummyCharacterSheets = doc.CharacterSheets;
        if(dummyCharacterSheets != null && this.username == "TestingOne") {
            this.charSheets = new Array();
            for(var i = 0; i < dummyCharacterSheets.length; i++) {
                let newCharSheet = new CharSheet( dummyCharacterSheets[i].charName );
                //console.log( newCharSheet );
                newCharSheet.editInformation( dummyCharacterSheets[i].charName, dummyCharacterSheets[i].race, dummyCharacterSheets[i].charClass, 
                dummyCharacterSheets[i].charSubclass, dummyCharacterSheets[i].lvl, dummyCharacterSheets[i].allignment, dummyCharacterSheets[i].stats, 
                dummyCharacterSheets[i].statModifiers, dummyCharacterSheets[i].combatStats, dummyCharacterSheets[i].classFeatures, 
                dummyCharacterSheets[i].background, dummyCharacterSheets[i].money, dummyCharacterSheets[i].equipment, dummyCharacterSheets[i].spells);
                //console.log( newCharSheet );
                this.charSheets.push(newCharSheet);
            }

            //console.log( this.charSheets );
        }

        //console.log( this.charSheets );

        let dummyDMScreen = doc.DMScreen;
        if(dummyDMScreen != null) {
            this.dmScreen = new DMScreen( this.username, dummyDMScreen.NPCList );
        }
        //this.dmScreen = new DMScreen( this.username, dummyDMScreen.NPCList);
    }


    /**
     * Edit all of the variables at once inside of the class instead of doing them individually.
     * @param displayName 
     * @param email 
     * @param password 
     * @param privacyLvl 
     * @param blockedProfiles 
     * @param friends 
     * @param location 
     * @param status 
     * @param tags 
     * @param aboutMe 
     * @param pfp 
     * @param availableTime 
     * @param timezone 
     */
    public editInformation(displayName : string, email : string, password : string, privacyLvl : string, blockedProfiles : Array<string>, 
    friends : Array<string>, location : string, status : string, tags : Map<string, boolean>, aboutMe : string, pfp : BinaryData, availableTime : string,
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

    /**
     * This updates the MongoDB document pertaining to this profile of any new changes that were made to it.
     */
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
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "DMScreen", this.dmScreen );
    }



    /**
     * Creates a new CharSheet object given a charName and appends it to the CharSheets array.
     * @param charName 
     */
    public createCharSheet(charName : string){

        let newSheet = new CharSheet(charName);
        this.charSheets.push(newSheet);
        this.updateDB();
    }

    /**
     * Given the character sheet, it allows for all of the variables to be modified at once rather than doing modifying them individually.
     * @param charSheet 
     * @param charName 
     * @param race 
     * @param charClass 
     * @param charSubClass 
     * @param lvl 
     * @param allignment 
     * @param stats 
     * @param statModifiers 
     * @param combatStats 
     * @param classFeatures 
     * @param background 
     * @param money 
     * @param equipment 
     * @param spells 
     */
    public updateCharSheet(charSheet : CharSheet, charName : string, race : string, charClass : string, charSubClass : string, lvl : string, allignment : string,
        stats : any, statModifiers : any, combatStats : any, classFeatures : string, background : string, money : any, equipment : string, spells : any){
        charSheet.editInformation(charName, race, charClass, charSubClass, lvl, allignment, stats, statModifiers, combatStats, classFeatures, background,
        money, equipment, spells);
        this.updateDB();
    }

    /**
     * Given a position, this function looks through charSheet array and sees if there's any CharSheet obj at that position. If there is a CharSheet obj
     * at that position, then this returns it, and if there isn't then it returns a string statement saying there wasn't a CharSheet Obj at that posiiton.
     * @param pos 
     * @returns CharSheet obj in charSheet Array Pos or String saying it doesn't exist.
     */
    public accessCharacterSheet(pos : number) {

        if(this.charSheets[pos] != null) {
            return this.charSheets[pos];
        }
        else {
            return "The character sheet at this position is null";
        }
    }

    /**
     * Adds another user's username to the friends array.
     * @param friend 
     */
    public addFriend(friend : string) {
        this.friends.push(friend);
    }

    /**
     * Removes another user's username from the friends array.
     * @param friend 
     */
    public removeFriend(friend : string) {
        const index = this.friends.indexOf(friend, 0);
        if (index > -1) {
            this.friends.splice(index, 1);
        }
    }

    /**
     * Adds another user's username to the blockedProfiles array.
     * @param block 
     */
    public addBlocked(block : string) {
        this.blockedProfiles.push(block);
    }

    /**
     * Removes another user's username from the blockedProfiles array.
     * @param block 
     */
    public removeBlocked(block : string) {
        const index = this.blockedProfiles.indexOf(block, 0);
        if (index > -1) {
            this.blockedProfiles.splice(index, 1);
        }
    }

    /**
     * Allows for the modification of the db variable. This was mostly done because whenever the Profile Obj would try to be converted
     * into a JSON obj, the db variable would be an open circular object, so it wouldn't allow for JSON.stringify() to work.
     * @param mongo 
     */
    public setMongoDB(mongo : MongoDB) {
        this.db = mongo;
    }

    /**
     * This returns the variable displayName.
     * @returns variable displayName
     */
    public returnDisplayName() {
        return this.displayName;
    }

    /**
     * This returns the variable username.
     * @returns variable username.
     */
    public returnUsername() {
        return this.username;
    }

    /**
     * This returns the variable password.
     * @returns variable password.
     */
    public returnPassword() {
        return this.password;
    }

}