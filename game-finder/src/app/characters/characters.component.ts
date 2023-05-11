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
  constructor(private http: HttpClient) { }

  characters: Array<Character> = [    //hard code 5 characters for testing
    new Character("Character 1"),
    new Character("Character 2"),
    new Character("Character 3"),
    new Character("Character 4"),
    new Character("Character 5"),
  ];
  onSubmit() {
    const formData = {
      name: this.name,
      race: this.race,
      class: this.class,
      subclass: this.subclass,
      level: this.level,
      alignment: this.alignment
    };
  
    this.http.post('http://34.30.183.36:80/characters', formData).subscribe(response => {
      console.log(response);
    });
  }
  

  
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