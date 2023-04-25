/**
 * This is the character sheet that'll go inside of the user's profile class and it contains things like stats, name, race, background
 * , etc. More things that a character sheet should have for DnD.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */

import {Spell} from "./Spell";

export class CharSheet {

    private charName;
    private race;
    private background;
    private backstory;
    private lvl;
    private charClass;
    //private stats = new Map<string, string>();   //Wait why is this a map/hash again ? I could've just returned an array and we have the naming
    //scheme of it being something like [int, def, atk, etc]
    private spells : Array<Spell>;
    private stats : Array<string>;
    private equipment : Array<string>;
    private inventory : Array<string>;
    private languages : Array<string>;
    private skills : Array<string>;
    //Need to add a photos[3]

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
    constructor(charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string, spells : Array<Spell>,
    stats : Array<string>, equipment : Array<string>, inventory : Array<string>, languages : Array<string>, skills : Array<string>) {
        this.charName = charName;
        this.race = race;
        this.background = background;
        this.backstory = backstory;
        this.lvl = lvl;
        this.charClass = charClass;
        this.spells = spells;
        this.stats = stats;
        this.equipment = equipment;
        this.inventory = inventory;
        this.languages = languages;
        this.skills = skills;
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
    public editInformation(charName : string, race : string, background : string, backstory : string, lvl : string, charClass : string, spells : Array<Spell>,
    stats : Array<string>, equipment : Array<string>, inventory : Array<string>, languages : Array<string>, skills : Array<string>) {
            this.charName = charName;
            this.race = race;
            this.background = background;
            this.backstory = backstory;
            this.lvl = lvl;
            this.charClass = charClass;
            this.spells = spells;   //This'll prob be null to begin with 
            this.stats = stats;
            this.equipment = equipment;
            this.inventory = inventory;
            this.languages = languages;
            this.skills = skills;
    }

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
    school : Array<string>, components : Array<string>, materialCost : Array<string>, races : Array<string>, reqClasses : Array<string>) {
        let newSpell = new Spell(spellName, castingTime, range, duration, desc, spellLvl, school, components, materialCost, races, reqClasses);
        this.addSpell( newSpell );
    }

    /**
     * Adds the newly created spell from createSpell() to the spell array in this obj.
     * @param newSpell 
     */
    public addSpell( newSpell : Spell) {
        this.spells.push(newSpell);
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
        returnArray.push(this.inventory);
        returnArray.push(this.languages);
        returnArray.push(this.skills);

        return returnArray;
    }
}
