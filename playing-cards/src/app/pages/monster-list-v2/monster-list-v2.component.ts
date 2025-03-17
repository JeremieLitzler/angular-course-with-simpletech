import { Component, inject, model } from '@angular/core';

import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { MonsterWithHttpResourceService } from '../../services/monster/monster-with-http-resource.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monster-list',
  imports: [PlayingCardComponent, FormsModule],
  templateUrl: './monster-list-v2.component.html',
  styleUrl: './monster-list-v2.component.css',
})
export class MonsterListV2Component {
  monsterWithHttpResourceService = inject(MonsterWithHttpResourceService);
  monstersWithHttpResource = this.monsterWithHttpResourceService.monsters;
  monstersError = this.monsterWithHttpResourceService.monstersError;
  monstersStatus = this.monsterWithHttpResourceService.monstersStatus;
  monstersIsLoading = this.monsterWithHttpResourceService.monstersIsLoading;

  selectedMonsterId = model<string | undefined>();
  selectedMonsterResource =
    this.monsterWithHttpResourceService.aProperMonsterResource(
      this.selectedMonsterId,
    );
}
