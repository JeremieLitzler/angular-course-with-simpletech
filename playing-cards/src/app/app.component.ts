import { Component, computed, model } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
})
export class AppComponent {
  // The "!" is used for what?
  monsters!: Monster[];
  search = model('');

  filteredMonsters = computed(() =>
    this.monsters.filter((monster) => monster.name.includes(this.search())),
  );
  constructor() {
    this.monsters = [];
    const pik = {
      name: 'Pikachou',
      hp: 100,
      image: 'assets/images/electric.jpg',
      type: MonsterType.ELECTRIC,
      attackDesc: 'Pikachou chocks !!!',
      attackName: 'Strike',
      attackStrength: 40,
      figureCaption: 'The famous one',
    };
    const car = {
      name: 'Car',
      hp: 60,
      image: 'assets/images/water.jpg',
      type: MonsterType.WATER,
      attackDesc: 'Car drowns you !!!',
      attackName: 'Drown',
      attackStrength: 50,
      figureCaption: 'The enemy of Pikachou',
    };
    const bulb = {
      name: 'Bulb',
      hp: 80,
      image: 'assets/images/plant.jpg',
      type: MonsterType.PLANT,
      attackDesc: 'Bulb bites you !!!',
      attackName: 'Bites',
      attackStrength: 75,
      figureCaption: 'The dangerous plant',
    };

    const sala = {
      name: 'Sala',
      hp: 40,
      image: 'assets/images/fire.jpg',
      type: MonsterType.FIRE,
      attackDesc: 'Sala burns you !!!',
      attackName: 'Burns',
      attackStrength: 60,
      figureCaption: 'Ouch... it is hot!',
    };

    this.monsters.push(...[pik, car, bulb, sala]);
  }
}
