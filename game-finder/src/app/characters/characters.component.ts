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
 * A lot of the code and documentation was done by Andrew
 * Some of the future revisions were left up to Ariella to complete.
 */
export class CharactersComponent {

  characters: Character[]; // Declare the property with the correct type

  // constructor() {
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

  //To get individual parts from the input
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

  /**
   * This is ran whenever the page is opened / reloaded.
   */
  async ngOnInit() {

    //Grabs the stored username in the current session that the user is on.
    this.username = sessionStorage.getItem('currentUser') as string;

    //This fetches the length of the character sheet in the user's profile so it knows how many times to loop through
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

    //Goes through an array that's character sheet length and grabs all of the character sheet objects from backend 
    // and parse through the information here to create a new character sheet object.
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
        //This is the parsing through data to make another character sheet object
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
   * Should've been changed later but couldn't as I was told not to work on the project anymore - Andrew
   */
  characterCreation(charName : string, race : string, charClass : string, charSubClass : string, lvl : string, allignment : string) {

    fetch(this.ip + "AddCharacterSheet?Username=" + this.username + "&CharacterName=" + charName + "&Race=" +  race + "&CharacterClass=" + charClass + 
    "&CharacterSubClass=" + charSubClass + "&Level=" + lvl + "&Allignment=" + allignment,{
      method: "GET",
    })
  }


  /**
   * Just the standard of creating a character sheet
   * Should've been changed later but I couldn't modify the code anymore - Andrew
   */
  characterCreationStandard() {
    this.characterCreation(this.charName, this.race, this.charClass, this.charSubClass, this.lvl, this.allignment);
    window.location.reload();
  }

  /**
   * Updates all of the information that's in panel 2
   * @param position 
   */
  updatePanel2(position : number) {  //Done
    this.stats.push(this.str);
    this.stats.push(this.dex);
    this.stats.push(this.con);
    this.stats.push(this.int);
    this.stats.push(this.wis);
    this.stats.push(this.cha);

    //Sends information to webserver for information in the backend to be updated.
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

    //Sends information to webserver for information in the backend to be updated.
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "statModifiers" +
    "&NewVar=" + this.statModifiers,{
      method: "GET",
    })
    window.location.reload(); //Reloads window
    
  }

  /**
   * This should've been fixed later and I'm not sure why - Andrew
   * @param position 
   */
  updatePanel3(position : number) {

  }

  /**
   * Updates all of the information in panel 4.
   * @param position 
   */
  updatePanel4(position : number) {  //Done
    this.combatStats.push(this.armor);
    this.combatStats.push(this.init);
    this.combatStats.push(this.spd);
    this.combatStats.push(this.chp);
    this.combatStats.push(this.thp);

    //Sends information to webserver for information in the backend to be updated.
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "combatStats" +
    "&NewVar=" + this.combatStats,{
      method: "GET",
    })
    window.location.reload();
  }

  /**
   * Updates all of the information in panel 5
   * @param position 
   */
  updatePanel5(position : number) {
    //Sends information to webserver for information in the backend to be updated.
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&classFeatures=" + this.classFeatures,{
      method: "GET",
    })
    fetch(this.ip + "SetCharacterSheetVar?Username==" + this.username + "&background=" + this.background,{
      method: "GET",
    })
    window.location.reload();
  }

  /**
   * Updates all of the information in panel 6
   * @param position 
   */
  updatePanel6(position : number) {  //Done
    this.money.push(this.gold);
    this.money.push(this.silver);
    this.money.push(this.electrum);

    //Sends information to webserver for information in the backend to be updated.
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "money" +
    "&NewVar=" + this.money,{
      method: "GET",
    })

    //Sends information to webserver for information in the backend to be updated.
    fetch(this.ip + "SetCharacterSheetVar?Username=" + this.username + "&CharacterPos=" + position + "&ReqVar=" + "equipment" +
    "&NewVar=" + this.equipment,{
      method: "GET",
    })

    window.location.reload();
  }


  /**
   * Some of the panel information like 3, 5 & 6 needed to be revised. There needed to be an input type when taking in the information
   * so that it could be sent here to later be sent to the webserver to be saved in the database. Not sure why it was ever done but I tried
   * communicating the changes that needed to be done - Andrew
   */

}

/**
 * Character class
 * This basically stores all of the information that needs to be saved / retrieved from the database
 * that makes the character sheet the way it is for charSheet.ts in backend code.
 * A lot of the documentation for this is the same as charClass.ts in backend or in the TSBackend branch that can be found in the backend
 * folder. Besides the first two variables which actually play a key role in retrieving / sending the information to the webserver so
 * that it can retrieved from the database or saved to it.
 * position : number (The characters position in the array so you know where to access it in the array / charSheet in profile in backend)
 * name : string (This is the username so you know where to pull the information from)
 * charName : string (This is the character's name)
 * race : string
 * charClass : string
 * charSubClass : string
 * lvl : string
 * allignment : string
 * 
 * stats : Array<number>
 * statModifiers : Array<number>
 * 
 * comatStats : Array<number>
 * 
 * classFeatures : string
 * background : string
 * 
 * money : Array<number>
 * equipment : string
 * 
 * spells : new Array()
 * pictures : new Array()
 * 
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

  //These are all individual parts of it so it can be saved from the input
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
  //To get individual parts from input so it can be saved to the object.
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


