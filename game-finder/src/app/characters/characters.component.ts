import { Component } from '@angular/core';
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
      new Character(3, "Character 4")
    ]; // Initialize the property in the constructor
  }

  ip = "http://34.30.183.36:80/"
  //username = sessionStorage.getItem('currentUser') as string;
  username! : string;
  length! : number;


  charName! : string; //Done
  race! : string; //Done
  charClass! : string;  //Done
  charSubClass! : string; //Done
  lvl! : string;  //Done
  allignment! : string; //Done

  //Segment 2
  stats = new Array();     //[str, dexterity, constitution, intelligence, wisdom, charisma]
  statModifiers = new Array();

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
  combatStats = new Array();  //[Armour Class, Initiative, Speed, Current HP, Total HP]
  armor! : number;
  init! : number;
  spd! : number;
  chp! : number;
  thp! : number;

  //Segment 5
  classFeatures! : string;
  background! : string;

  //Segment 6
  money = new Array();    //[Gold, silver, electrum]
  gold! : number;
  silver! : number;
  electrum! : number;
  equipment! : string;

  //Segment 7
  spells = new Array();
  pictures = new Array();

  //Should be called ngOnInit
  ngOnInit() {

    //this.characters[0].name = "Testing";

    this.username = sessionStorage.getItem('currentUser') as string;

    fetch(this.ip + "ReturnCharacterSheetLength?Username=" + this.username, {
      method: "GET",
    })
    .then( (response) => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then( (content) => {
      var data = content;
      this.length = Number.parseInt(data);
    })

    for(var i = 0; i < this.length; i++){
      fetch(this.ip + "ReturnCharacterSheetInfo?Username=" + this.username + "&CharacterPos" + i, {
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
        //const placeholder = new Character(i, data.charName);
        console.log(content.charName); // Print the value to the console
        this.characters[i].name = content.charName;
        this.characters[i].race = content.race;
        this.characters[0].name = "Testing";
        //this.characters[i] = placeholder;
    })
    .catch(error => {
        // Handle any errors that occur during the fetch request
        console.error(error);
    })
    
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

  updatePanel2() {  //Done
    this.stats.push(this.str);
    this.stats.push(this.dex);
    this.stats.push(this.con);
    this.stats.push(this.int);
    this.stats.push(this.wis);
    this.stats.push(this.cha);

    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&stats=" + this.stats,{
      method: "GET",
    })

    this.statModifiers.push(this.strMod);
    this.statModifiers.push(this.dexMod);
    this.statModifiers.push(this.conMod);
    this.statModifiers.push(this.intMod);
    this.statModifiers.push(this.wisMod);
    this.statModifiers.push(this.chaMod);

    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&statsModifiers=" + this.statModifiers,{
      method: "GET",
    })
  }

  updatePanel3() {

  }

  updatePanel4() {  //Done
    this.combatStats.push(this.armor);
    this.combatStats.push(this.init);
    this.combatStats.push(this.spd);
    this.combatStats.push(this.chp);
    this.combatStats.push(this.thp);
    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&combatStats=" + this.combatStats,{
      method: "GET",
    })
  }

  updatePanel5() {
    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&classFeatures=" + this.classFeatures,{
      method: "GET",
    })
    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&background=" + this.background,{
      method: "GET",
    })
  }

  updatePanel6() {  //Done
    this.money.push(this.gold);
    this.money.push(this.silver);
    this.money.push(this.electrum);

    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&money=" + this.money,{
      method: "GET",
    })

    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&equipment=" + this.equipment,{
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
    stats = new Array();     //[str, dexterity, constitution, intelligence, wisdom, charisma]
    statModifiers = new Array();

    //Segment 3
    //Proficiencies

    //Segment 4
    combatStats = new Array();  //[Armour Class, Initiative, Speed, Current HP, Total HP]

    //Segment 5
    classFeatures! : string;
    background! : string;

    //Segment 6
    money = new Array();    //[Gold, silver, electrum]
    equipment! : string;

    //Segment 7
    spells = new Array();
    pictures = new Array();


  constructor(position : number, name : string){
    this.position = position;
    this.name = name;
  }

  
}


