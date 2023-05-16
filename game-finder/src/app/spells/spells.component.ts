import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent  implements OnInit {
  ip = "http://34.30.183.36:80/";
  spells: any[] = [];

  ngOnInit() {
    this.fetchSpells(); // Call the function to fetch spells when the component initializes
  }

  fetchSpells() {
    fetch('http://34.30.183.36:80/spells/RecommendSpells')
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        this.spells = data; // Assign the fetched spells to the component property
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}
