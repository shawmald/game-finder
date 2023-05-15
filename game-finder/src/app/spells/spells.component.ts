import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent  implements OnInit {
  spells: any[] = [];
  selectedClasses: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchSpells();
  }

  fetchSpells() {
    // Make an HTTP request to the backend API to retrieve the filtered spells based on selected classes
    const selectedClassesQuery = this.selectedClasses.join(',');
    const url = `http://34.30.183.36:80/spells?classes=${selectedClassesQuery}`;
    this.http.get<any[]>(url)
      .subscribe(data => {
        this.spells = data;
      });
  }

  onClassSelectionChange() {
    this.fetchSpells();
  }
}
