import { Component } from '@angular/core';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.css']
})
export class DiceRollerComponent {
  randomNumber!: number;

  generateRandomNumber() {
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
  }
}
