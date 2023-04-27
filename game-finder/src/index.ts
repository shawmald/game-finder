/**
 * 
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */


import * as Webserver from "./Webserver";
import { MongoDB } from "./mongoDB";    //To remove after testing
import { ProfileManagement } from "./ProfilesManagement";   //This should be removed later after testing

import {Spell} from "./Spell";  //This should be removed later after testing
//import * as Database from "./mongoDB";

import mongoDB from "mongodb";
import { CharSheet } from "./CharSheet";

//Got the mongoDB library from this link https://www.npmjs.com/package/mongodb
//https://www.tutorialspoint.com/how-to-retrieve-all-the-documents-from-a-mongodb-collection-using-java#:~:text=Connect%20to%20a%20database%20using,invoking%20the%20find()%20method.
//https://www.mongodb.com/docs/manual/reference/method/cursor.forEach/
//https://www.mongodb.com/docs/manual/reference/method/cursor.map/



let uri : string = "mongodb+srv://gameFinder:ASUq%23%2AAIwq%29@gamefinder.2rj5gki.mongodb.net/?retryWrites=true&w=majority";

//Promise<void>


let database = new MongoDB(uri);
database.connect();

//When is Promise<void> needed ? Dunno need to test further 
async function printUsername() { 
    const collection = database.returnCollection("ProfilesDB", "Profiles");
    const doc = await collection.findOne( {Username : "TestingOne" } );
    if( doc != null){
        //console.log( doc );
        console.log( doc.Username );
    }
    else{
        console.log( "The username provided isn't correct. Please try again" );
    }
    

}

//printUsername();
console.log( "We've gotten through all of that :D ");

function test() {
    let profilesManagement = new ProfileManagement( database );
    console.log( profilesManagement.signIn( "TestingOne", "TestingOne", "!Testing") );
}

//test();

//const testReturnVar = database.getVar( "ProfilesDB", "Profiles", "TestingOne", "Username");
//console.log( testReturnVar );

//database.updateDB( "ProfilesDB", "Profiles", "TestingOne", "DisplayName", "TheThingWorks" );

//const testingJSON = JSON.stringify(Webserver);
//console.log( testingJSON );

//let newSpell = new Spell( "Fireball", "5s", "500m", "5s", "This shoots a fireball at any enemies", "1", null as any, null as any, 
//null as any, null as any, null as any);
//let newSpell2 = new Spell( "Fireball", "5s", "500m", "5s", "This shoots a fireball at any enemies", "1", ["Fire"], null as any, 
//null as any, null as any, null as any);
//console.log( JSON.stringify(newSpell) );
const spellArray = new Array();
//spellArray.push(newSpell);
//spellArray.push(newSpell2);
//database.updateDB( "ProfilesDB", "Profiles", "TestingOne", "Spells", JSON.stringify(spellArray) );

//let newCharSheet = new CharSheet( "Bob", "Human", "Was a builder in a previous life", "Idk something something something", "50", 
//"Builder", spellArray, null as any, null as any, null as any, null as any, null as any);
//database.updateDB( "ProfilesDB", "Profiles", "TestingOne", "CharacterSheets", JSON.stringify(newCharSheet) );

Webserver.startServer();








