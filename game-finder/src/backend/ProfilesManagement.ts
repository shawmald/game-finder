/**
 * The ProfilesManagement class handles the storage and management of an array of profiles. It primarily focuses on the backend functionalities
 * related to login, signup, and general profile management.
 * The ProfilesManagement class provides the following functions:
 * initialize(): Retrieves all the profiles stored in the database and initializes the Profile class for each profile,
 * allowing for efficient and organized information manipulation.
 * signIn(): Handles the creation of a new profile by checking if the username is available and storing the new profile in the database.
 * If the username is already taken, it returns a string indicating that the username is unavailable.
 * login(): Verifies the login credentials provided by a user and returns a boolean value indicating the success or failure of the login.
 * accessUser(): Given a username, it searches through the profile list for potential matches and returns the corresponding profile information.
 * returnProfileUsernames(): Returns an array containing all the usernames of the profiles stored in the ProfileList.
 * @Author Andrew SKevington-Olivera
 * 19-4-23
 */


import { MongoDB } from "./mongoDB";
import { Profile } from "./Profile";

export class ProfileManagement {

    public profileList = new Array();
    private db : MongoDB;

    constructor( db : MongoDB) {
        this.db = db;
        this.initialize();
    }

    /**
     * This creates a Profile Class for each of the different Profiles that're being stored in the Database.
     * It then adds it to the profileList array and makes sure all of the information is being transferred over from the
     * database into the Profile Object.
     */
    async initialize() {

        const collection = this.db.returnCollection("ProfilesDB", "Profiles");

        var usernameList = new Array();
        var pwList = new Array();

        await collection.find().forEach( function(myDoc: { Username: string; } ) { usernameList.push(myDoc.Username) }  );
        await collection.find().forEach( function(myDoc: { Password: string; } ) { pwList.push(myDoc.Password) } );

        for(var i = 0; i < usernameList.length; i++){
            let oldProfile = new Profile( usernameList[i], pwList[i], this.db);
            this.profileList.push( oldProfile );
        }
    }

    /**
     * This checks if the username that the user wants is taken or not, if the username isn't taken then a new Profile Obj
     * will be created and pushed to the array, and it'll be saved to the database.
     * @param displayName 
     * @param email 
     * @param username 
     * @param password 
     * @returns Returns true if username hasn't been chosen yet, false if username is taken.
     */
    async signIn(displayName : string, email : string, username : string, password : string) {

        const collection = this.db.returnCollection("ProfilesDB", "Profiles");
        const doc = await collection.findOne( {Username : username} );

        if(doc == null) {    //Username hasn't been chosen yet for the website
            let newProfile = new Profile(displayName, email, username, password, this.db);
            this.profileList.push( newProfile )
            console.log("A new profile should be in the process of being created");
            return true;
        }
        
        console.log( "The username was already being taken" );
        return false;   //The username is already taken
    }

    /**
     * Checks if the login information is correct and returns a bool to say true or false for the login credentials given.
     * @param username 
     * @param password 
     * @returns true is information is correct & false if it's wrong.
     */
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

    /**
     * Looks through all of the profiles in profileList and sees if any of the usernames matche up.
     * @param username
     * @returns Profile Obj with the same username.
     */
    public async accessUser(username : string) {

        for(var i = 0; i < this.profileList.length; i++) {
            if(username == this.profileList[i].returnUsername() ) {
                let copyProfile = this.profileList[i];  //Can probably just return this.profileList[i] later
                return copyProfile;
            }
        }
    }


    /**
     * This goes through each of the profiles in the profileList array and appends their username to an array
     * to return.
     * @returns usernames of all profiles in profileList array.
     */
    public returnProfileUsernames() {

        let usernameList = new Array();

        for(var i = 0; i < this.profileList.length; i++) {
            usernameList.push( this.profileList[i].username );
        }   

        return usernameList;
    }


}