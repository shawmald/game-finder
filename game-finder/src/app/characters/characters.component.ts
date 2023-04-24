import { Component } from '@angular/core';

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
  characters: Array<Character> = [    //hard code 5 characters for testing
    new Character("Character 1"),
    new Character("Character 2"),
    new Character("Character 3"),
    new Character("Character 4"),
    new Character("Character 5"),
  ];

  
}

/**
 * Character class
 */
export class Character {
  name: string = "";

  constructor(name: string){
    this.name = name;
  }
}