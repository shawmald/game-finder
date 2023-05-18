/**
 * The InfoStorage class is responsible for managing spell retrieval from the database to the character sheet.
 * It retrieves all the spells saved in the database and sends them to the character sheet as an array of spell objects.
 * The InfoStorage class provides the following functionalities:
 * saveSpells(): Saves new spells to the database for future use.
 * returnSpells(): Retrieves all the spells currently stored in the database as an array of spell objects.
 * @Author Andrew Skevington-Olivera
 * @Date 20-4-23
 */

import { MongoDB } from "./mongoDB";
import { Spell } from "./Spell";


export class InfoStorage {

    public db : MongoDB;

    constructor( db : MongoDB) {
        this.db = db;
    }

    /**
     * Saves any new spells to the database.
     * @param spell 
     */
    public saveSpells(spell : Spell) {
        const collection = this.db.returnCollection( "StoredInfo", "Spells" );
        collection.insertOne( { "Spell" : JSON.stringify(spell) } );
    }

    /**
     * This gets all of the different spells information in the database and converts them to a Spell object, to be
     * put into an array and then returned.
     * @returns all spells being saved in database in an array
     */
    public async returnSpells() {
        const collection = this.db.returnCollection( "StoredInfo", "Spells" );
        const spellArr = new Array();
        const returnSpellArr = new Array();

        await collection.find().forEach( function(myDoc: { Spell : string; } ) { spellArr.push( myDoc.Spell ) } );

        //console.log( spellArr );

        for(var i = 0; i < spellArr.length; i++) {
            let newSpell = new Spell( spellArr[i].Name );
            newSpell.editInformation( spellArr[i].Name, spellArr[i].Level, spellArr[i].Duration, spellArr[i].School, spellArr[i].Range, spellArr[i].Components,
            spellArr[i].Classes, spellArr[i].Text, spellArr[i].CastingTime)
            returnSpellArr.push( newSpell );
        }

        //console.log( returnSpellArr );

        return returnSpellArr;
    }

}