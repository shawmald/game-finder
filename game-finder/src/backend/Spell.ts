/**
 * This is for the spells that the CharacterSheet can have and it has all of the different parts of a spell that's
 * required to make one for DnD.
 * @Author Andrew Skevington-Olivera
 * @Date 19-4-23
 */


export class Spell { 

    public spellName! : string;
    public level! : string;
    public duration! : string;
    public school! : string;
    public range! : string;
    public components! : string;
    public classes! : Array<string>;
    public text! : string;
    public castingTime! : string;


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
    editInformation(spellName : string, level : string, duration : string, school : string, range : string, components : string, 
    classes : Array<string>, text : string, castingTime : string) {
        this.spellName = spellName;
        this.level = level;
        this.duration = duration;
        this.school = school;
        this.range = range;
        this.components = components;
        this.classes = classes;
        this.text = text;
        this.castingTime = castingTime;
    }
    
}

