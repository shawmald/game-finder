import { StatUtil } from "./StatUtil";

/**
 * 
 * @author: Andrew Skevington-Olivera
 * @date: 13-5-23
 */
export class NPC {
    statTool: StatUtil = new StatUtil();

    public name!: string;
    public lvl! : number;
    public class! : string;
    public stats! : Map<string,number>;
    public statMods! : Map<string,number>;
    public notes! : string;
    

    constructor( name:string='Name', lvl:number=1, job:string='Class', cHP:number=50, mHP:number=50, ac:number=12, spd:number=30, str:number=10, dex:number=10, con:number=10, int:number=10, wis:number=10, cha:number=10, notes:string='notes' ) {
        this.name = name;
        this.lvl = lvl;
        this.class = job;

        this.stats = new Map<string,number>();
        this.stats.set("cHP", cHP);     //current HP    default=50
        this.stats.set("mHP", mHP);     //max HP        default=50
        this.stats.set("ac", ac);       //armor class   default=12
        this.stats.set("spd", spd);     //speed         default=30
        this.stats.set("str", str);     //strength      default=10
        this.stats.set("dex", dex);     //dexterity     default=10
        this.stats.set("con", con);     //constitution  default=10
        this.stats.set("int", int);     //intelligence  default=10
        this.stats.set("wis", wis);     //wisdom        default=10
        this.stats.set("cha", cha);     //charisma      default=10

        this.statMods = new Map<string,number>();
        this.statMods.set("str", this.statTool.calcMod( str ));     //strength modifier
        this.statMods.set("dex", this.statTool.calcMod( dex ));     //dexterity modifier
        this.statMods.set("con", this.statTool.calcMod( con ));     //constitution modifier
        this.statMods.set("int", this.statTool.calcMod( int ));     //intelligence modifier
        this.statMods.set("wis", this.statTool.calcMod( wis ));     //wisdom modifier
        this.statMods.set("cha", this.statTool.calcMod( cha ));     //charisma modifier
        
        this.notes = notes;
    }

    public setStat( statName:string, statVal:number ): void {
        this.stats.set( statName, statVal );     //TODO add validation
    }

    public setAllStats( str:number, dex:number, con:number, int:number, wis:number, cha:number ): void {
        this.stats.set("str", str);
        this.stats.set("dex", dex);
        this.stats.set("con", con);
        this.stats.set("int", int);
        this.stats.set("wis", wis);
        this.stats.set("cha", cha);
    }
}