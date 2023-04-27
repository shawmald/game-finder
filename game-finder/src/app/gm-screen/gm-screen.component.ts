import { Component } from '@angular/core';
//import { StatUtil } from 'game-finder/src/app/StatUtil.ts';

@Component({
  selector: 'app-gm-screen',
  templateUrl: './gm-screen.component.html',
  styleUrls: ['./gm-screen.component.css']
})
export class GmScreenComponent {
  npcs: NPC[] = Array<NPC>( new NPC(), new NPC(), new NPC(), new NPC() );

  add( name:string='Name', level:number=1, job:string='Class', str:number=10, dex:number=10, con:number=10, int:number=10, wis:number=10, cha:number=10, notes:string='notes' ): void {
    if( this.npcs.length < 12 ){
      this.npcs.push( new NPC( name, level, job, str, dex, con, int, wis, cha, notes) );
    }
  }

  remove( index:number ): void {
    if( index < this.npcs.length ){
      delete this.npcs[index];
    }
  }
}

export class NPC {
  name: string;
  level: number;
  class: string;
  stats: Map<string,number>;
  notes: string;

  /**
   * Create a new NPC. Default values used if nothing is provided
   * 
   * @param name  (string) default = 'Name'
   * @param level (number) default = 1
   * @param job   (string) default = 'Class'
   * @param str   (number) default = 10
   * @param dex   (number) default = 10
   * @param con   (number) default = 10
   * @param int   (number) default = 10
   * @param wis   (number) default = 10
   * @param cha   (number) default = 10
   * @param notes (string) default = 'notes'
   */
  constructor( name:string='Name', level:number=1, job:string='Class', str:number=10, dex:number=10, con:number=10, int:number=10, wis:number=10, cha:number=10, notes:string='notes' ){
    this.name = name;
    this.level = level;
    this.class = job;
    
    this.stats = new Map<string,number>();
    this.stats.set("str", str);
    this.stats.set("dex", dex);
    this.stats.set("con", con);
    this.stats.set("int", int);
    this.stats.set("wis", wis);
    this.stats.set("cha", cha);
    
    this.notes = notes;
  }

  /**
   * Calculate a stat's modifier given the stat.
   * 
   * @param stat (number)
   * @returns (number)
   */
  calcMod( stat: number | undefined ): number;
  calcMod( stat: number ): number {
    let mod: number = <number>stat;

    if( (mod % 2) != 0 ){ mod -= 1; }   //if number is odd: subtract one
    mod = (mod-10)/2;

    return mod;
  }

  /**
   * Test calcMod() with inputs 1-30
   * @returns (string)
   */
  /*
  test_calcMod(): string {
    let output: string = ``;

    for( let i=1; i<31; i++ ){
      output += `Stat: ${i}\tMod: ${this.calcMod(i)}\n`
    }

    return output;
  }
  */

}