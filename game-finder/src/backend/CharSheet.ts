/**
 * The CharacterSheet class represents a character sheet within the Profile.
 * It stores various fields required for a character sheet and enables users to modify and make changes to it.
 * The CharacterSheet class provides the following functions:
 * editInformation(): Allows the frontend to edit all information in the character sheet simultaneously instead of individually.
 * createSpell(): Creates a new spell with the given name and adds it to the Spell array.
 * updateSpell(): Updates the information of a spell with new data sent from the frontend.
 * accessSpell(): Retrieves the spell at the specified position. If it exists, the spell is returned; otherwise, a string indicating the non-existence of the 
 * spell at that position is returned.
 * infoAddSpell(): Adds the spell to the spell database.
 * spellRecommendation(): Searches for spell matches based on the character sheet's class. It compares the stored spells in the database provided by the 
 * InfoStorage Class.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import { Spell } from "./Spell";
import { MongoDB } from "./mongoDB";
import { InfoStorage } from "./InfoStorage";

export class CharSheet {

    //Segment 1
    private charName;
    private race! : string;
    private charClass! : string;
    private charSubclass! : string;
    private lvl! : string;
    private allignment! : string;

    //Segment 2
    private stats = new Array();     //[str, dexterity, constitution, intelligence, wisdom, charisma]
    private statModifiers = new Array();

    //Segment 3
    //Proficiencies

    //Segment 4
    private combatStats = new Array();  //[Armour Class, Initiative, Speed, Current HP, Total HP]

    //Segment 5
    private classFeatures! : string;
    private background! : string;

    //Segment 6
    private money = new Array();    //[Gold, silver, electrum]
    private equipment! : string;

    //Segment 7
    private spells = new Array();
    private pictures = new Array();

    constructor(charName : string) {
        this.charName = charName;
    }

    /**
     * Allows for the ability to modify all of the fields in the character sheet at once instead of updating them one by one.
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
    public editInformation(charName : string, race : string, charClass : string, charSubClass : string, lvl : string, allignment : string, stats : any, statModifiers : any, combatStats : any,
        classFeatures : string, background : string, money : any, equipment : string, spells : any) {
        this.charName = charName;
        this.race = race;
        this.charClass = charClass;
        this.charSubclass = charSubClass;
        this.lvl = lvl;
        this.allignment = allignment;

        this.stats = stats;
        this.statModifiers = statModifiers;
        
        this.combatStats = combatStats;

        this.classFeatures = classFeatures;
        this.background = background;

        this.money = money;
        this.equipment = equipment;

        this.spells = spells;
    }


    /**
     * This would create a new spell and add it to the Spell array.
     * This had the option of adding any new spells to the database but was later removed because it got overburdened and
     * there was no proper management going into it.
     * @param spellName 
     * @param db 
     */
    public createSpell(spellName : string, db : MongoDB) {
        let newSpell = new Spell(spellName);
        this.spells.push(newSpell); 
        //this.infoAddSpell( newSpell, db );
    }


    /**
     * Updates all of the information in a given spell at once instead of modifying the information one field at a time.
     * @param spell 
     * @param spellName 
     * @param level 
     * @param duration 
     * @param school 
     * @param range 
     * @param components 
     * @param classes 
     * @param text 
     * @param castingTime 
     */
    public updateSpell(spell : Spell, spellName : string, level : string, duration : string, school : string, range : string, components : string, 
    classes : Array<string>, text : string, castingTime : string) {
        spell.editInformation( spellName, level, duration, school, range, components, classes, text, castingTime);
    }

    /**
     * This goes through the Spell Array and looks for a spell at the specified position and if no spell exists at that position, then it returns
     * a string saying that a spell doesn't exist at the position given.
     * @param spellPos 
     * @returns spell at that position if it exists, or a string saying a spell doesn't exist at that position.
     */
    public accessSpell(spellPos : number) {
        if( this.spells[spellPos] != null) {
            return this.spells[spellPos];
        }
        else {
            return "The spell is null and hasn't been created in this position yet"
        }
    }

    /**
     * This adds the spell information to the database to be used for later.
     * @param spell 
     * @param db 
     */
    public infoAddSpell( spell : Spell, db : MongoDB ) {
        let storage = new InfoStorage( db );
        storage.saveSpells( spell );
    }

    /**
     * Given all of the spells that're being stored in the database, it goes through each of them and looks at the classes that match each
     * of the different spells and sees if one of the spells classes matches up with the character sheet class and if it does, then its added
     * to the recSpells array. The recSpells array is just recommended spells that're going to be returned, because they match the character 
     * sheet's class.
     * @param db 
     * @returns list of spells that match the character sheet's class.
     */
    public async spellRecommendation( db : MongoDB) {
        let spellStorage = new InfoStorage(db);
        const recSpells = new Array();
        const allSpells = await spellStorage.returnSpells();

        //console.log( allSpells ); //This works
        
        for(var i = 0; i < allSpells.length; i++) {
            for(var j = 0; j < allSpells[i].classes.length; j++) {
                if( allSpells[i].classes[j] == this.charClass ) {
                    recSpells.push( allSpells[i] );
                }

            }
        }

        //console.log( recSpells );

        return recSpells;
    }

}
