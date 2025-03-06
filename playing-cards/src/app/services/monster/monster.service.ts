import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  //Defines the scope of the service, here it is available to all the app.
  providedIn: 'root',
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex = 1;

  constructor() {
    this._load();
  }
  private _init() {
    const pik = new Monster();
    pik.id = this.currentIndex++;
    pik.name = 'Pikachou';
    pik.hp = 100;
    pik.image = 'assets/images/electric.jpg';
    pik.type = MonsterType.ELECTRIC;
    pik.attackDesc = 'Pikachou chocks !!!';
    pik.attackName = 'Strike';
    pik.attackStrength = 40;
    pik.figureCaption = 'The famous one';

    const car = new Monster();
    car.id = this.currentIndex++;
    car.name = 'Car';
    car.hp = 60;
    car.image = 'assets/images/water.jpg';
    car.type = MonsterType.WATER;
    car.attackDesc = 'Car drowns you !!!';
    car.attackName = 'Drown';
    car.attackStrength = 50;
    car.figureCaption = 'The enemy of Pikachou';

    const bulb = new Monster();
    bulb.id = this.currentIndex++;
    bulb.name = 'Bulb';
    bulb.hp = 80;
    bulb.image = 'assets/images/plant.jpg';
    bulb.type = MonsterType.PLANT;
    bulb.attackDesc = 'Bulb bites you !!!';
    bulb.attackName = 'Bites';
    bulb.attackStrength = 75;
    bulb.figureCaption = 'The dangerous plant';

    const sala = new Monster();
    sala.id = this.currentIndex++;
    sala.name = 'Sala';
    sala.hp = 40;
    sala.image = 'assets/images/fire.jpg';
    sala.type = MonsterType.FIRE;
    sala.attackDesc = 'Sala burns you !!!';
    sala.attackName = 'Burns';
    sala.attackStrength = 60;
    sala.figureCaption = 'Ouch... it is hot!';

    this.monsters.push(...[pik, car, bulb, sala]);
  }

  private readonly MONSTER_DB = 'monster-db';
  private _save() {
    localStorage.setItem(this.MONSTER_DB, JSON.stringify(this.monsters));
  }

  private _load() {
    const data = localStorage.getItem(this.MONSTER_DB);

    if (data && data !== '[]') {
      this.monsters = JSON.parse(data!).map((monsterJSON: Monster) =>
        Object.assign(new Monster(), monsterJSON),
      );
      this.currentIndex = Math.max(
        ...this.monsters.map((element) => element.id),
      );
    } else {
      this._init();
      this._save();
    }
  }
  getAll() {
    return this.monsters.map((m) => m.copy());
  }

  get(id: number) {
    const match = this.monsters.find((m) => m.id === id);
    return match ? match.copy() : undefined;
  }

  add(monster: Monster) {
    const newMonster = monster.copy();
    newMonster.id = this.currentIndex;
    this.monsters.push(newMonster.copy());
    this.currentIndex++;
    this._save();

    return newMonster;
  }

  update(monster: Monster) {
    const updatedMonster = monster.copy();
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === monster.id,
    );

    if (monsterIndex !== -1) {
      this.monsters[monsterIndex] = updatedMonster.copy();
      this._save();
    } else {
      console.warn(
        `No monster found for id=<${monster.id}>. Caching or UI refresh issue?`,
      );
    }

    return updatedMonster;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === id,
    );

    if (monsterIndex !== -1) {
      delete this.monsters[monsterIndex];
      this._save();

      // this.monsters.splice(monsterIndex, 1)
    } else {
      console.warn(
        `No monster found for id=<${id}>. Caching or UI refresh issue?`,
      );
    }
  }
}
