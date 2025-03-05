export enum MonsterType {
  PLANT = 'plant',
  ELECTRIC = 'electric',
  FIRE = 'fire',
  WATER = 'water',
}

export interface IMonsterProperties {
  iconUrl: string;
  color: string;
}

export const MonsterTypeProperties: Record<string, IMonsterProperties> = {
  [MonsterType.PLANT]: {
    iconUrl: 'assets/icons/lucide--tree-pine.svg',
    color: 'lime',
  },
  [MonsterType.ELECTRIC]: {
    iconUrl: 'assets/icons/lucide--zap.svg',
    color: 'yellow',
  },
  [MonsterType.FIRE]: {
    iconUrl: 'assets/icons/lucide--flame.svg',
    color: 'red',
  },
  [MonsterType.WATER]: {
    iconUrl: 'assets/icons/lucide--droplets.svg',
    color: 'cyan',
  },
};
