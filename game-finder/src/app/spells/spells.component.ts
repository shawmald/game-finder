import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { writeFile } from 'xlsx';
import { HttpClient } from '@angular/common/http';
import * as csvParser from 'csv-parser';




@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent {
  Bard = false;
  Cleric = false;
  Druid = false;
  Paladin = false;
  Ranger = false;
  Sorcerer = false;
  Warlock = false;
  Wizard = false;
  spells: any[] = [];
  

  // spells = [
  //   { name: "Spell 1", classes: ["bard", "cleric"] },
  //   { name: "Spell 2", classes: ["bard", "sorcerer"] },
  //   { name: "Spell 3", classes: ["paladin"] },
  //   { name: "Spell 4", classes: ["ranger", "warlock"] },
  //   { name: "Spell 5", classes: ["wizard"] },
  // ];
  filteredSpells: any[] = [];
  //get spells
  constructor(private http: HttpClient) {
    this.http.get('./spellList.csv', { responseType: 'text' })
    .subscribe(data => {
      // Parse the CSV data into an array of objects
      const spells = parseCsv(data);
      // Use the spellList in your component
      this.spells = spells;
      this.filterSpells();
    });
  }
  

  

  // constructor() {
  //   this.filterSpells();
  // }

  filterSpells() {
    this.filteredSpells = this.spells.filter(spell => {
      if (this.Bard && !spell.classes.includes("bard")) {
        return false;
      }
      if (this.Cleric && !spell.classes.includes("cleric")) {
        return false;
      }
      if (this.Druid && !spell.classes.includes("druid")) {
        return false;
      }
      if (this.Paladin && !spell.classes.includes("paladin")) {
        return false;
      }
      if (this.Ranger && !spell.classes.includes("ranger")) {
        return false;
      }
      if (this.Sorcerer && !spell.classes.includes("sorcerer")) {
        return false;
      }
      if (this.Warlock && !spell.classes.includes("warlock")) {
        return false;
      }
      if (this.Wizard && !spell.classes.includes("wizard")) {
        return false;
      }
      return true;
    });
  }


  ngOnInit() {
    this.http.get('spells.csv', { responseType: 'text' })
      .subscribe(
        data => {
          csvParser({
            separator: ',',
            mapHeaders: ({ header }: { header: string }) => header.toLowerCase().trim().replace(/ /g, "_")
          })
          .on('data', (row: any) => {
            this.spells.push(row);
          })
          .on('end', () => {
            this.filterSpells();
          });
        },
        err => console.log(err)
      );
  }
  
}




function parseCsv(data: string): any[] {
  const results: any[] = [];
  csvParser({ separator: ',' })
    .on('data', (row) => {
      results.push(row);
    })
    .write(data);
  return results;
}
