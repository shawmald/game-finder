/**
 * GM Screen Typescript file
 */
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NpcDialogComponent } from '../npc-dialog/npc-dialog.component';
import { StatUtil } from 'src/backend/StatUtil';

@Component({
  selector: 'app-gm-screen',
  templateUrl: './gm-screen.component.html',
  styleUrls: ['./gm-screen.component.css']
})
export class GmScreenComponent {
  statTool: StatUtil = new StatUtil();
  npcs: NPC[] = Array<NPC>( new NPC(), new NPC(), new NPC(), new NPC() );

  add( name:string='Name', level:number=1, job:string='Class', cHP:number=50, mHP:number=50, ac:number=12, spd:number=30, str:number=10, dex:number=10, con:number=10, int:number=10, wis:number=10, cha:number=10, notes:string='notes' ): void {
    if( this.npcs.length < 12 ){
      this.npcs.push( new NPC( name, level, job, cHP, mHP, ac, spd, str, dex, con, int, wis, cha, notes) );
    }
  }

  remove( index:number ): void {
    if( index < this.npcs.length ){
      delete this.npcs[index];
    }
  }

  constructor( public dialog: MatDialog ){}

  openDialog( npc: NPC ): void {
    const dialogRef = this.dialog.open( NpcDialogComponent, {
      width: "550px",
      data: {
        npc: npc
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log( "The dialog was closed" );
      //this.?? = result;
    })
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
  constructor( name:string='Name', level:number=1, job:string='Class', cHP:number=50, mHP:number=50, ac:number=12, spd:number=30, str:number=10, dex:number=10, con:number=10, int:number=10, wis:number=10, cha:number=10, notes:string='notes' ){
    this.name = name;
    this.level = level;
    this.class = job;
    
    this.stats = new Map<string,number>();
    this.stats.set("cHP", cHP);
    this.stats.set("mHP", mHP);
    this.stats.set("ac", ac);
    this.stats.set("spd", spd);
    this.stats.set("str", str);
    this.stats.set("dex", dex);
    this.stats.set("con", con);
    this.stats.set("int", int);
    this.stats.set("wis", wis);
    this.stats.set("cha", cha);
    
    this.notes = notes;
  }

}