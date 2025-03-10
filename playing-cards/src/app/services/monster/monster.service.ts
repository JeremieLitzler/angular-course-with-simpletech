import { inject, Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../constants/app.constants';
import { map, Observable } from 'rxjs';
import { IMonster } from '../../interfaces/monster.interface';

@Injectable({
  //Defines the scope of the service, here it is available to all the app.
  providedIn: 'root',
})
export class MonsterService {
  private http = inject(HttpClient);
  monsters: Monster[] = [];

  currentIndex = 1;

  constructor() {
    this._init();
  }
  private _init() {
    console.log('Init monster service');
  }

  getAll() {
    console.log('Call GET /monsters/');

    return this.http
      .get<IMonster[]>(`${AppConstants.API_BASE_URL}/monsters/`)
      .pipe(
        map((monsterJsonArray) => {
          return monsterJsonArray.map<Monster>((itemJson) =>
            Monster.fromJson(itemJson),
          );
        }),
      );
  }

  get(id: number | undefined) {
    console.log('Call GET /monsters/:id/', id);
    return this.http
      .get<IMonster>(`${AppConstants.API_BASE_URL}/monsters/${id}/`)
      .pipe(map((monsterJson) => Monster.fromJson(monsterJson)));
  }

  add(monster: Monster) {
    return this.http
      .post<IMonster>(
        `${AppConstants.API_BASE_URL}/monsters/`,
        monster.toJson(),
      )
      .pipe(map((monsterJson) => Monster.fromJson(monsterJson)));
  }

  update(monster: Monster) {
    console.log('Call PUT /monsters/:id/');
    return this.http
      .put<IMonster>(
        `${AppConstants.API_BASE_URL}/monsters/${monster.id}/`,
        monster.toJson(),
      )
      .pipe(map((monsterJson) => Monster.fromJson(monsterJson)));
  }

  delete(id: number | undefined): Observable<void> {
    return this.http.delete<void>(
      `${AppConstants.API_BASE_URL}/monsters/${id}/`,
    );
  }
}
