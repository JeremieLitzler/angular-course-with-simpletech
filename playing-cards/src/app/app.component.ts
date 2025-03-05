import { Component, computed, signal } from '@angular/core';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './models/monster.model';
import { MonsterType } from './utils/monster.utils';

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
  imports: [PlayingCardComponent],
})
export class AppComponent {
  // The "!" is used for what?
  monsters!: Monster[];
  searchClickCount = 0;
  searchedTermParent = '';

  selectedMonsterIndex = signal<number>(1);
  selectedMonster = computed<Monster>(
    () => this.monsters[this.selectedMonsterIndex()],
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
      hp: 600,
      image: 'assets/images/water.jpg',
      type: MonsterType.WATER,
      attackDesc: 'Car drowns you !!!',
      attackName: 'Drown',
      attackStrength: 50,
      figureCaption: 'The enemy of Pikachou',
    };

    this.monsters.push(...[pik, car]);
  }
  toggleMonster() {
    this.selectedMonsterIndex.set(
      (this.selectedMonsterIndex() + 1) % this.monsters.length,
    );
  }
}
