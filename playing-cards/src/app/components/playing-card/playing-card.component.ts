import { Component, computed, input } from '@angular/core';
import { MonsterTypeProperties } from '../../utils/monster.utils';
import { IMonster } from '../../interfaces/monster.interface';

@Component({
  selector: 'app-playing-card',
  imports: [],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.css',
})
export class PlayingCardComponent {
  monster = input.required<IMonster | undefined>();

  monsterTypeIcon = computed(() =>
    this.monster() ? MonsterTypeProperties[this.monster()!.type].iconUrl : '',
  );
  backgroundColor = computed(() =>
    this.monster() ? MonsterTypeProperties[this.monster()!.type].color : '',
  );
}
