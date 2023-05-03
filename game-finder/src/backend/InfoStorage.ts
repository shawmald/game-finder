/**
 * I don't even know what this was created for tbh
 * I think it was just storing all of the different races, equipment, classes, spells, etc for the 
 * user to access whenever they wanted to ???
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */

import { MongoDB } from "./mongoDB";
import { Spell } from "./Spell";

//Honestly I think this was for storing all of the different stuff needed in MongoDB
//But I'll leave this here for now and not work on it until its needed which will probably be needed as
//soon as I get the server up & running

export class InfoStorage {

    public db : MongoDB;

    constructor( db : MongoDB) {
        this.db = db;
    }


    public saveSpells(spell : Spell) {
        const collection = this.db.returnCollection( "StoredInfo", "Spells" );
        //collection.insertOne( {"Spell Name" : spell.spellName, "Casting Time" : spell.castingTime, "Range" : spell.range, "Duration" : spell.duration,
        //"Description" : spell.desc, "Spell Level" : spell.spellLvl, "School" : spell.school, "Components" : spell.components, "Races" : spell.races,
        //"Required Classes" : spell.reqClasses } );
        collection.insertOne( { "Spell" : JSON.stringify(spell) } );
    }

    public async returnSpells() {
        const collection = this.db.returnCollection( "StoredInfo", "Spells" );
        const spellArr = new Array();
        await collection.find().forEach( function(myDoc: { Spell : string; } ) { spellArr.push( JSON.parse(myDoc.Spell) ) } );
        return spellArr;
    }

}