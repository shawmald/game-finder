/**
 * 
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */



//import mongoDB, { MongoClient } from "mongodb";
//import * as DB from "./mongoDB";
import { MongoDB } from "./mongoDB";
import { CharSheet } from "./CharSheet";
import {Spell} from "./Spell";
//const {MongoClient} = require('mongodb');   //This is needed to get MongoClient to start working for whatever reaso

export class Profile {

    //Need to have a token so that the profiles can be more secure
    private displayName;
    private username;
    private password;
    private permissionLvl;
    //private privacyLvl;
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
            this.permissionLvl = "0";
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
        this.permissionLvl = doc.PermissionLevel;
        this.charSheets = JSON.parse( doc.CharacterSheets );
        this.blockedProfiles = doc.BlockedProfiles;
        this.friends = doc.Friends;
    }



    public editInformation(displayName : string, password : string, permissionLvl : string, blockedProfiles : Array<string>, friends : Array<string>) {
        this.displayName = displayName;
        this.password = password;
        this.permissionLvl = permissionLvl;
        this.blockedProfiles = blockedProfiles;
        this.friends = friends;

        this.db.updateDB("ProfilesDB", "Profiles", this.username, "DisplayName", this.displayName);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Password", this.password);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "PermissionLevel", this.permissionLvl);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "BlockedProfiles", this.blockedProfiles);
        this.db.updateDB("ProfilesDB", "Profiles", this.username, "Friends", this.friends);
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

    public accessCharacterSheet(charName : string) {

        for(var i = 0; i < this.charSheets.length; i++){
            if( charName = this.charSheets[i].charName ) {
                return this.charSheets[i];
            }
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