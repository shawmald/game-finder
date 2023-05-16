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
    
    public createSpell(spellName : string, db : MongoDB) {
        let newSpell = new Spell(spellName);
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

}
