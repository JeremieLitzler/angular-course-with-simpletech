import { MonsterType } from '../utils/monster.utils';

export class Monster {
  id = -1;
  name = 'Default Monster Name';
  image = 'assets/images/electric.jpg';
  type = MonsterType.ELECTRIC;
  hp = 40;
  figureCaption = 'Default Monster figure caption';
  attackName = 'Default Attack name';
  attackStrength = 60;
  attackDescription = 'Default Attack description';

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }
}
