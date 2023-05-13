/**
 * This is for the spells that the CharacterSheet can have and it has all of the different parts of a spell that's
 * required to make one for DnD.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */


export class Spell { 

    public spellName! : string;
    public castingTime! : string;
    public range! : string;
    public duration! : string;
    public desc! : string;
    public spellLvl! : string;

    public school! : Array<string>;
    public components! : Array<string>;
    public races! : Array<string>;
    public reqClasses! : Array<string>;


    /**
     * This is the constructor for spells 
     * @param spellName 
     */
    constructor(spellName : string) {
        this.spellName = spellName;
    }

    /**
     * Gets all of the information that the frontend can send to here and it'll modify the current spell class information
     */
    editInformation(spellName : string, castingTime : string, range : string, duration : string, desc : string, spellLvl : string, school : Array<string>,
    components : Array<string>, races : Array<string>, reqClasses : Array<string>) {
        this.spellName = spellName;
        this.castingTime = castingTime;
        this.range = range;
        this.duration = duration;
        this.desc = desc;
        this.spellLvl = spellLvl;
        this.school = school;
        this.components = components;
        this.races = races;
        this.reqClasses = reqClasses;
    }
    
}

