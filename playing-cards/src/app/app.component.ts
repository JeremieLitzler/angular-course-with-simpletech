import { Component } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

//@Component is a decorator
@Component({
  // the custom element to declare the component in index.html
  selector: 'app-root',
  // replaced the NgModule paradigm used on older Angular version
  // TODO > to research because application won't all be using the
  // newest standalone feature
  standalone: true,
  // The HTML inline with the TS code
  template: '',
  templateUrl: './app.component.html',
  // The CSS styles inline with the TS code
  // styles: '',
  styleUrl: './app.component.css',
  imports: [PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  // The "!" is used for what?
  pik!: Monster;
  searchClickCount = 0;
  searchedTermParent = '';

  constructor() {
    this.pik = {
      name: 'Pikachou',
      hp: 100,
      attackDesc: 'Pikachou strikes !!!',
      attackName: 'Strike',
      attackStrength: 40,
      figureCaption: 'The famous one',
    };
  }

  increaseCount() {
    this.searchClickCount++;
  }
}
