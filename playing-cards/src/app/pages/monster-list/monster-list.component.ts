import { Component, computed, inject, model, signal } from '@angular/core';

import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../models/monster.model';

@Component({
  selector: 'app-monster-list',
  imports: [PlayingCardComponent, SearchBarComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css',
})
export class MonsterListComponent {
  monsterService = inject(MonsterService);

  // The "!" is used for what?
  monsters = signal<Monster[]>([]);
  search = model('');

  filteredMonsters = computed(() =>
    this.monsters().filter((monster) => monster.name.includes(this.search())),
  );
  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster);
    this.monsters.set(this.monsterService.getAll());
  }
}
