/**
 * 
 * @Author Andrew SKevington-Olivera
 * 19-4-23
 */


import { MongoDB } from "./mongoDB";
//import * as DB from "./mongoDB";
import {Profile} from "./Profile";
//const {MongoClient} = require('mongodb');   //This is needed to get MongoClient to start working for whatever reason

export class ProfileManagement {

    private profileList = new Array();
    private db : MongoDB;

    /**
     * 
     * @param db 
     */
    constructor( db : MongoDB) {
        this.db = db;
        this.initialize();
    }

    /**
     * 
     */
    async initialize() {

        const collection = this.db.returnCollection("ProfilesDB", "Profiles");

        var usernameList = new Array();
        var pwList = new Array();

        await collection.find().forEach( function(myDoc: { Username: string; } ) { usernameList.push(myDoc.Username) }  );
        await collection.find().forEach( function(myDoc: { Password: string; } ) { pwList.push(myDoc.Password) } );

        for(var i = 0; i < usernameList.length; i++){
            let oldProfile = new Profile( usernameList[i], pwList[i], this.db);
            this.addProfile(oldProfile);
        }
    }

    /**
     * 
     * @param displayName 
     * @param username 
     * @param password 
     * @returns 
     */
    async signIn(displayName : string, username : string, password : string) {

        const collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne( {Username : username} );

        if(doc == null) {    //Username hasn't been chosen yet for the website
            let newProfile = new Profile(displayName, username, password, this.db);
            this.addProfile(newProfile);
            console.log("A new profile should be in the process of being created");
            return true;
        }
        
        console.log( "The username was already being taken" );
        return false;   //The username is already taken
    }

    async login( username : string, password : string){

        const collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne( {Username : username} );
        if(doc != null) {
            if( password === doc.Password) {
                return true;    //Information was correct.
            }
            else {
                return false;   //Password wasn't correct. User should try to enter their login information again.
            }
        }
        else{
            return false;   //Username wasn't in the database. User should try to enter their login information again.
        }
    }

    addProfile( profile : Profile) {
        this.profileList.push(profile)
    }

    async accessUser(username : string) {

        for(var i = 0; i < this.profileList.length; i++) {
            if(username == this.profileList[i].returnUsername() ) {
                let copyProfile = this.profileList[i];
                //copyProfile.setMongoDB();
                //return JSON.stringify(copyProfile);
                return copyProfile;
            }
        }
    }


}