/**
 * This is the character sheet that'll go inside of the user's profile class and it contains things like stats, name, race, background
 * , etc. More things that a character sheet should have for DnD.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import { Spell } from "./Spell";
import { MongoDB } from "./mongoDB";
import { InfoStorage } from "./InfoStorage";

export class CharSheet {

    public charName;
    private race;
    private background;
    private backstory;
    private lvl;
    private charClass;
    private equipment;  
    private stats = [1, 1, 1, 1, 1, 1];     //[str, dexterity, constitution, intelligence, wisdom, charisma]
    private statModifier = [0, 0, 0, 0, 0, 0]
    //Proficiency bonus
    private combatStats = [1, 1, 1, 1, 1, 1];   //[Armour class, initiative, speed, current hit pts, total hit pts, charisma ]
    private money = [0, 0, 0];  //[Gold, Silver, Electrum]
    private spells : Array<Spell> = [];
    private skills : Array<string>;
    private pictures : Array<string>;   //This just stores a 64string picture

    //Each skill has a proficiency bonus in a certain stat

    //Add recommended racial feature depending on races
    //Add recommended skills depending on class

    /**
     * 
     * @param charName 
     * @param race 
     * @param background 
     * @param backstory 
     * @param lvl 
     * @param charClass 
     * @param spells 
     * @param stats 
     * @param equipment 
     * @param skills 
     */
    constructor(charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string, equipment : string,
    stats : Array<number>, statMods : Array<number>, combatStats : Array<number>, money : Array<number>, skills : Array<string>,
    pictures : Array<string>) {
        this.charName = charName;
        this.race = race;
        this.background = background;
        this.backstory = backstory;
        this.lvl = lvl;
        this.charClass = charClass;
        this.equipment = equipment;
        this.stats = stats;
        this.statModifier = statMods;
        this.combatStats = combatStats;
        this.money = money;
        this.skills = skills; 
        this.pictures = pictures;

    }


    /**
     * 
     * @param charName 
     * @param race 
     * @param background 
     * @param backstory 
     * @param lvl 
     * @param charClass 
     * @param spells 
     * @param stats 
     * @param equipment 
     * @param inventory 
     * @param languages 
     * @param skills 
     */
    public editInformation(charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string, equipment : string,
    stats : Array<number>, statMods : Array<number>, combatStats : Array<number>, money : Array<number>, skills : Array<string>,
    pictures : Array<string>) {
        this.charName = charName;
        this.race = race;
        this.background = background;
        this.backstory = backstory;
        this.lvl = lvl;
        this.charClass = charClass;
        this.equipment = equipment;
        this.stats = stats;
        this.statModifier = statMods;
        this.combatStats = combatStats;
        this.money = money;
        //this.spells = spells;
        this.skills = skills; 
        this.pictures = pictures;
    }


    //Need to have mongodb be here for a temp amount of time
    /**
     * Create spell function so that it's easier to add spells to the character sheet instead of doing
     * it in a jankier way.
     * @param spellName 
     * @param castingTime 
     * @param range 
     * @param duration 
     * @param desc 
     * @param spellLvl 
     * @param school 
     * @param components 
     * @param materialCost 
     * @param races 
     * @param reqClasses 
     */
    public createSpell(spellName : string, castingTime : string, range : string, duration : string, desc : string, spellLvl : string,
    school : Array<string>, components : Array<string>, races : Array<string>, reqClasses : Array<string>, db : MongoDB) {
        let newSpell = new Spell(spellName, castingTime, range, duration, desc, spellLvl, school, components, races, reqClasses);
        this.addSpell( newSpell );
        this.infoAddSpell( newSpell, db );
    }

    /**
     * Adds the newly created spell from createSpell() to the spell array in this obj.
     * @param newSpell 
     */
    public addSpell( newSpell : Spell) {
        this.spells.push(newSpell); 
    }

    public updateSpell(spell : Spell, spellName : string, castingTime : string, range : string, duration : string, desc : string, spellLvl : string,
    school : Array<string>, components : Array<string>, races : Array<string>, reqClasses : Array<string> ) {
        spell.editInformation( spellName, castingTime, range, duration, desc, spellLvl, school, components, races, reqClasses );
    }

    public accessSpell(spellPos : number) {
        if( this.spells[spellPos] != null) {
            return this.spells[spellPos];
        }
        else {
            return "The spell is null and hasn't been created in this position yet"
        }
    }

    /**
     * 
     * @param spell 
     */
    public infoAddSpell( spell : Spell, db : MongoDB ) {
        let storage = new InfoStorage( db );
        storage.saveSpells( spell );
    }

    public async spellRecommendation( db : MongoDB) {
        let spellStorage = new InfoStorage(db);
        const recSpells = new Array();
        const allSpells = await spellStorage.returnSpells();
        for(var i = 0; i < allSpells.length; i++) {
            if( allSpells[i] == this.race ) {
                recSpells.push( allSpells[i] );
            }
        }
    }

    //I could either return everything in a giant array or do something else
    //I can actually do JSON.stringify() to return all of the information in 1 big array, so that'll be preferred 
    //Leave this empty for now and probably isn't worth it tbh
    returnInformation() {
        const returnArray = new Array();
        returnArray.push(this.charName);
        returnArray.push(this.race);
        returnArray.push(this.background);
        returnArray.push(this.backstory);
        returnArray.push(this.lvl);
        returnArray.push(this.charClass);
        returnArray.push(this.stats);
        returnArray.push(this.spells);
        returnArray.push(this.equipment);
        returnArray.push(this.skills);

        return returnArray;
    }
}
