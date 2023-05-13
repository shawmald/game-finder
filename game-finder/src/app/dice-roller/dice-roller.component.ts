import { Component } from '@angular/core';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.css']
})
export class DiceRollerComponent {
  randomNumber!: number;
  numberCount!: number;
  numberRange!:number;
  randomNumbers!: number[];

  generateRandomNumbers() {
    this.randomNumbers = [];
  
    for (let i = 0; i < this.numberCount; i++) {
      const number = Math.floor(Math.random() * this.numberRange) + 1;
      this.randomNumbers.push(number);
    }
  }
}
