/**
 * The Spell class contains the basic information for spells and provides functionality for editing spell information.
 * Most of the data manipulation related to spells is handled in the CharSheet class, which has the necessary functions for this purpose.
 * The Spells class includes the following function:
 * editInformation(): Allows for easy modification of all the data stored in the class.
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
     * Allows for all of the information to be changed at once instead of changing them one field at a time.
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

