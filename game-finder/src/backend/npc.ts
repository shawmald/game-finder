import { StatUtil } from "./StatUtil";


/**
 * This is the basic information for all of the different fields that're needed for NPC.
 * The ability to manage these NPCs are in DMScreen.
 * @author: Andrew Skevington-Olivera
 * @date: 13-5-23
 */
export class NPC {
    private statTool: StatUtil = new StatUtil();

    public name!: string;
    public lvl! : number;
    public class! : string;
    public notes! : string;
    public stats : Map<string,number> = new Map<string,number>();
    public statMods : Map<string,number> = new Map<string,number>();

    /**
     * Create a new NPC. If arguments are not provided, use default values.
     * 
     * @param name  (string)    Name of NPC,        default='Name'
     * @param lvl   (number)    level of NPC,       default=1
     * @param job   (string)    class/job of NPC,   default='Class'
     * @param notes (string)    notes for NPC,      default='notes'
     * @param cHP   (number)    current HP,         default=50
     * @param mHP   (number)    maximum HP,         default=50
     * @param ac    (number)    armor class,        default=12
     * @param spd   (number)    speed,              default=30
     * @param str   (number)    strength,           default=10
     * @param dex   (number)    dexterity,          default=10
     * @param con   (number)    constitution,       default=10
     * @param int   (number)    intelligence,       default=10
     * @param wis   (number)    wisdom,             default=10
     * @param cha   (number)    charisma,           default=10
     */
    constructor( name:string='Name', lvl:number=1, job:string='Class', notes:string='notes', cHP:number=50, mHP:number=50, ac:number=12, spd:number=30, str:number=10, dex:number=10, con:number=10, int:number=10, wis:number=10, cha:number=10 ) {
        this.editInfo( name, lvl, job, notes, cHP, mHP, ac, spd, str, dex, con, int, wis, cha );
    }

    /**
     * Edits an NPC's information.
     * 
     * @param name  (string)    Name of NPC
     * @param lvl   (number)    level of NPC        (1 <= lvl <= 20)
     * @param job   (string)    class/job of NPC
     * @param notes (string)    notes for NPC
     * @param cHP   (number)    current HP          (important: ALLOWED to exceed maximum HP since there are spells that allow you to overheal)
     * @param mHP   (number)    maximum HP          (mHP > 0)
     * @param ac    (number)    armor class
     * @param spd   (number)    speed
     * @param str   (number)    strength            (1 <= lvl <= 30)
     * @param dex   (number)    dexterity           (1 <= lvl <= 30)
     * @param con   (number)    constitution        (1 <= lvl <= 30)
     * @param int   (number)    intelligence        (1 <= lvl <= 30)
     * @param wis   (number)    wisdom              (1 <= lvl <= 30)
     * @param cha   (number)    charisma            (1 <= lvl <= 30)
     */
    public editInfo( name:string, lvl:number, job:string, notes:string, cHP:number, mHP:number, ac:number, spd:number, str:number, dex:number, con:number, int:number, wis:number, cha:number ): void {
        this.name = name;
        
        if( lvl>0 && lvl<21 ){ this.lvl = lvl; }  //level between 1 and 20
        
        this.class = job;
        this.notes = notes;

        //update stats in map
        if( cHP>=0 ){ this.stats.set( 'cHP', cHP ); } //current HP must be non-negative, can be 0 if dead
        if( mHP>0 ){ this.stats.set( 'mHP', mHP ); }   //max HP must be greater than 0
        this.stats.set( 'ac', ac );     //armor class
        this.stats.set( 'spd', spd );   //speed
        if( str>0 && str<31 ){ this.stats.set( 'str', str ); }  //combat stats between 1 and 30
        if( dex>0 && dex<31 ){ this.stats.set( 'dex', dex ); }
        if( con>0 && con<31 ){ this.stats.set( 'con', con ); }
        if( int>0 && int<31 ){ this.stats.set( 'int', int ); }
        if( wis>0 && wis<31 ){ this.stats.set( 'wis', wis ); }
        if( cha>0 && cha<31 ){ this.stats.set( 'cha', cha ); }

        //calculate new stat modifiers from stats
        this.statMods.set( 'str', this.statTool.calcMod(str) );
        this.statMods.set( 'dex', this.statTool.calcMod(dex) );
        this.statMods.set( 'con', this.statTool.calcMod(con) );
        this.statMods.set( 'int', this.statTool.calcMod(int) );
        this.statMods.set( 'wis', this.statTool.calcMod(wis) );
        this.statMods.set( 'cha', this.statTool.calcMod(cha) );
    }
}