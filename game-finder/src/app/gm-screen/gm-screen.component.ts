import { Component } from '@angular/core';
//import { StatUtil } from 'game-finder/src/app/StatUtil.ts';

@Component({
  selector: 'app-gm-screen',
  templateUrl: './gm-screen.component.html',
  styleUrls: ['./gm-screen.component.css']
})
export class GmScreenComponent {
  npcs: NPC[] = Array<NPC>(12);

  /**
   * 
   * @param stat (number)
   * @returns (number)
   */
  calcMod( stat: number ): number {
    let mod: number = stat;

    if( (mod % 2) != 0 ){ mod -= 1; }   //if number is odd: subtract one
    mod = (mod-10)/2;

    return mod;
  }

  /**
   * Test calcMod() with inputs 1-30
   * @returns (string)
   */
  test_calcMod(): string {
    let output: string = ``;

    for( let i=1; i<31; i++ ){
      output += `Stat: ${i}\tMod: ${this.calcMod(i)}\n`
    }

    return output;
  }

}

export class NPC {
  name: string = '';
  class: string = '';
  stats: Map<string,number> = new Map<string,number>([
    ['Str', 10],
    ['Dex', 10],
    ['Con', 10],
    ['Int', 10],
    ['Wis', 10],
    ['Cha', 10]
  ]);
  info: string = '';

}