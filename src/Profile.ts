/**
 * 
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */



//import mongoDB, { MongoClient } from "mongodb";
//import * as DB from "./mongoDB";
import { MongoDB } from "./mongoDB";
import { CharSheet } from "./CharSheet";
//const {MongoClient} = require('mongodb');   //This is needed to get MongoClient to start working for whatever reaso

export class Profile {

    //Need to have a token so that the profiles can be more secure
    private displayName;
    private username;
    private password;
    private permissionLvl;
    private blockedProfiles = new Array();
    private friends = new Array();
    private charSheets : Array<CharSheet> = null as any;
    private db : MongoDB;
 
    public constructor(displayName : string, username : string, password : string, db : MongoDB);  //Constructor for signing up
    public constructor(username : string, password : string, db : MongoDB);    //Constructor for logging in

    constructor(...arr: any[] ) {

        if(arr.length == 4){
            this.displayName = arr[0];
            this.username = arr[1];
            this.password = arr[2];
            this.db = arr[3];
            this.permissionLvl = 0;
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
        collection.insertOne( {"Username" : this.username, "Password" : this.password, "PermissionLevel" : this.permissionLvl, 
        "CharacterSheets" : this.charSheets, "DisplayName" : this.displayName, "BlockedProfiles" : this.blockedProfiles,
        "Friends" : this.friends} );
    }

    /**
     * 
     */
    async getUserDBInfo() {
        let collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne( {Username : this.username} );

        this.displayName = doc.DisplayName;
        //console.log( this.displayName );
        //console.log( doc.DisplayName );
        this.permissionLvl = doc.PermissionLevel;
        this.charSheets = JSON.parse( doc.CharacterSheets );
        this.blockedProfiles = doc.BlockedProfiles;
        this.friends = doc.Friends;
    }





    //For profiles would I have it be something like calling the profile, then looking at the different character sheets
    //and going from that or should I just call the character sheets and have spells modified from that ?
    public createCharSheet(charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string,
    stats : Array<string>, equipment : Array<string>, inventory : Array<string>, languages : Array<string>, skills : Array<string>){

        let newSheet = new CharSheet(charName, race, background, backstory, lvl, charClass, null as any, stats, equipment, inventory, languages, skills);
        this.addCharacterSheet(newSheet);
    }

    public addCharacterSheet(newSheet : CharSheet) {
        this.charSheets.push(newSheet);
    }

    public setMongoDB(){
        this.db = null as any; 
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