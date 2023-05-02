/**
 * This is for the spells that the CharacterSheet can have and it has all of the different parts of a spell that's
 * required to make one for DnD.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */


export class Spell { 

    public spellName : string;
    public castingTime : string;
    public range : string;
    public duration : string;
    public desc : string;
    public spellLvl : string;

    public school : Array<string>;
    public components : Array<string>;
    public races : Array<string>;
    public reqClasses : Array<string>;


    /**
     * This is the constructor for spells 
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
    constructor(spellName : string, castingTime : string, range : string, duration : string, desc : string, spellLvl : string, school : Array<string>,
    components : Array<string>, races : Array<string>, reqClasses : Array<string> ) {
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

    /**
     * TO - REMOVE - LATER - IF - NOT - NEEDED - !!!!!!!!!!!!!!!!!!!
     * 
     * Returns all of the information inside of the spell class into 1 long array
     * This may no longer be necessary after an amt of time, as JSON.stringify() can return it nicely to MongoDB and send
     * it to frontend better than this array probably could.
     * But if needed for later, for frontend / backend necessities then better to leave it here for now.
     */
    returnInformation() {
        const returnArray = new Array();
        returnArray.push(this.spellName);
        returnArray.push(this.castingTime);
        returnArray.push(this.range);
        returnArray.push(this.duration);
        returnArray.push(this.desc);
        returnArray.push(this.spellLvl);
        returnArray.push(this.school);
        returnArray.push(this.components);
        //returnArray.push(this.materialCost);
        returnArray.push(this.races);
        returnArray.push(this.reqClasses);

        return returnArray;
    }
}

