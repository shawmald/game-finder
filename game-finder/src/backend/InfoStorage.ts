/**
 * I don't even know what this was created for tbh
 * I think it was just storing all of the different races, equipment, classes, spells, etc for the 
 * user to access whenever they wanted to ???
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


    public saveSpells(spell : Spell) {
        const collection = this.db.returnCollection( "StoredInfo", "Spells" );
        collection.insertOne( { "Spell" : JSON.stringify(spell) } );
    }

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