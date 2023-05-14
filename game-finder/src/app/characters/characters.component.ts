import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TagEditDialogComponent } from '../tag-edit-dialog/tag-edit-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { zipAll } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})


/**
 * Characters component class
 * store 5 character objects in an array
 */
export class CharactersComponent {

  characters: Character[]; // Declare the property with the correct type

  constructor() {
    this.characters = [
      new Character(0, "Character 1"),
      new Character(1, "Character 2"),
      new Character(2, "Character 3"),
      new Character(3, "Character 4"),
      new Character(4, "Character 5")
    ]; // Initialize the property in the constructor
  }

  ip = "http://34.30.183.36:80/"
  username! : string;
  length! : number;


  charName! : string; 
  race! : string;
  charClass! : string;  
  charSubClass! : string; 
  lvl! : string;  
  allignment! : string; 

  //Segment 2
  stats : Array<number> = [];     //[str, dexterity, constitution, intelligence, wisdom, charisma]
  statModifiers : Array<number> = [];

  str! : number;
  strMod! : number;
  dex! : number;
  dexMod! : number;
  con! : number;
  conMod! : number;
  int! : number;
  intMod! : number;
  wis! : number;
  wisMod! : number;
  cha! : number;
  chaMod! : number;

  //Segment 3
  //Proficiencies

  //Segment 4
  combatStats : Array<number> = [];  //[Armour Class, Initiative, Speed, Current HP, Total HP]
  armor! : number;
  init! : number;
  spd! : number;
  chp! : number;
  thp! : number;

  //Segment 5
  classFeatures! : string;
  background! : string;

  //Segment 6
  money : Array<number> = [];    //[Gold, silver, electrum]
  gold! : number;
  silver! : number;
  electrum! : number;
  equipment! : string;

  //Segment 7
  spells = new Array();
  pictures = new Array();

  async ngOnInit() {


    this.username = sessionStorage.getItem('currentUser') as string;

    await fetch(this.ip + "ReturnCharacterSheetLength?Username=" + this.username, {
      method: "GET",
    })
    .then( (response) => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then( (content) => {
      this.length = Number.parseInt(content);
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch request
      console.error(error);
    });


    for(var i = 0; i < this.length; i++) {
      await fetch(this.ip + "ReturnCharacterSheetInfo?Username=" + this.username + "&CharacterPos=" + String(i), {
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //return response.json(); // Parse response as JSON
        return response.text();
    })
    .then(data => {
        var content = JSON.parse(data);
        this.characters[i].name = content.charName;
        this.characters[i].race = content.race;
        this.characters[i].charClass = content.charClass;
        this.characters[i].charSubClass = content.charSubclass;
        this.characters[i].lvl = content.lvl;
        this.characters[i].allignment = content.allignment;
        this.characters[i].stats = content.stats.split(',');  //DONE
        this.characters[i].str = this.characters[i].stats[0];
        this.characters[i].dex = this.characters[i].stats[1];
        this.characters[i].con = this.characters[i].stats[2];
        this.characters[i].int = this.characters[i].stats[3];
        this.characters[i].wis = this.characters[i].stats[4];
        this.characters[i].cha = this.characters[i].stats[5];
        this.characters[i].statModifiers = content.statModifiers.split(',');  //DONE
        this.characters[i].strMod = this.characters[i].statModifiers[0];
        this.characters[i].dexMod = this.characters[i].statModifiers[1];
        this.characters[i].conMod = this.characters[i].statModifiers[2];
        this.characters[i].intMod = this.characters[i].statModifiers[3];
        this.characters[i].wisMod = this.characters[i].statModifiers[4];
        this.characters[i].chaMod = this.characters[i].statModifiers[5];
        this.characters[i].combatStats = content.combatStats.split(',');  //DONE
        this.characters[i].armor = this.characters[i].combatStats[0];
        this.characters[i].init = this.characters[i].combatStats[1];
        this.characters[i].spd = this.characters[i].combatStats[2];
        this.characters[i].chp = this.characters[i].combatStats[3];
        this.characters[i].thp = this.characters[i].combatStats[4];
        this.characters[i].classFeatures = content.classFeatures;
        this.characters[i].background = content.background;
        this.characters[i].money = content.money.split(',');  //DONE
        this.characters[i].gold = this.characters[i].money[0];
        this.characters[i].silver = this.characters[i].money[1];
        this.characters[i].electrum = this.characters[i].money[2];

        this.characters[i].equipment = content.equipment;
        //Skip spells for now
        //Skip pictures for now
    })
    .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error(error);
    });
    
    }

  }

  /**
   * Calls webserver api command AddCharacterSheet and adds the datasheet to the database
   */
  characterCreation(charName : string, race : string, charClass : string, charSubClass : string, lvl : string, allignment : string) {

    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&CharacterName=" + charName + "&Race=" +  race + "&CharacterClass=" + charClass + 
    "&CharacterSubClass=" + charSubClass + "&Level=" + lvl + "&Allignment=" + allignment,{
      method: "GET",
    })
  }



  characterCreationStandard() {
    this.characterCreation(this.charName, this.race, this.charClass, this.charSubClass, this.lvl, this.allignment);
  }

  updatePanel2(position : number) {  //Done
    this.stats.push(this.str);
    this.stats.push(this.dex);
    this.stats.push(this.con);
    this.stats.push(this.int);
    this.stats.push(this.wis);
    this.stats.push(this.cha);

    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "stats" +
    "&NewVar=" + this.stats,{
      method: "GET",
    })

    this.statModifiers.push(this.strMod);
    this.statModifiers.push(this.dexMod);
    this.statModifiers.push(this.conMod);
    this.statModifiers.push(this.intMod);
    this.statModifiers.push(this.wisMod);
    this.statModifiers.push(this.chaMod);

    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "statModifiers" +
    "&NewVar=" + this.statModifiers,{
      method: "GET",
    })
  }

  updatePanel3(position : number) {

  }

  updatePanel4(position : number) {  //Done
    this.combatStats.push(this.armor);
    this.combatStats.push(this.init);
    this.combatStats.push(this.spd);
    this.combatStats.push(this.chp);
    this.combatStats.push(this.thp);
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "combatStats" +
    "&NewVar=" + this.combatStats,{
      method: "GET",
    })
  }

  updatePanel5(position : number) {
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&classFeatures=" + this.classFeatures,{
      method: "GET",
    })
    fetch(this.ip + "SetCharacterSheetVar?Username==" + this.username + "&background=" + this.background,{
      method: "GET",
    })
  }

  updatePanel6(position : number) {  //Done
    this.money.push(this.gold);
    this.money.push(this.silver);
    this.money.push(this.electrum);

    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "money" +
    "&NewVar=" + this.money,{
      method: "GET",
    })

    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "equipment" +
    "&NewVar=" + this.equipment,{
      method: "GET",
    })
  }


  

}

/**
 * Character class
 */
export class Character {
  
  //Segment 1
    position! : number;
    name! : string;
    charName! : string;
    race! : string;
    charClass! : string;
    charSubClass! : string;
    lvl! : string;
    allignment! : string;

    //Segment 2
  stats : Array<number> = [];     //[str, dexterity, constitution, intelligence, wisdom, charisma]
  statModifiers : Array<number> = [];

  str! : number;
  strMod! : number;
  dex! : number;
  dexMod! : number;
  con! : number;
  conMod! : number;
  int! : number;
  intMod! : number;
  wis! : number;
  wisMod! : number;
  cha! : number;
  chaMod! : number;

  //Segment 3
  //Proficiencies

  //Segment 4
  combatStats : Array<number> = [];  //[Armour Class, Initiative, Speed, Current HP, Total HP]
  armor! : number;
  init! : number;
  spd! : number;
  chp! : number;
  thp! : number;

  //Segment 5
  classFeatures! : string;
  background! : string;

  //Segment 6
  money : Array<number> = [];    //[Gold, silver, electrum]
  gold! : number;
  silver! : number;
  electrum! : number;
  equipment! : string;

  //Segment 7
  spells = new Array();
  pictures = new Array();


  constructor(position : number, name : string){
    this.position = position;
    this.name = name;
  }

  
}


