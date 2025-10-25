import { Character, Player, PlayerStatus, CharacterRole, SkillLevel, MapData, SubRole } from './types';

export const INITIAL_CHARACTERS: Character[] = [
  { id: 'black_panther', name: 'Black Panther', role: CharacterRole.Duelist, subRole: SubRole.Dive, iconUrl: 'https://picsum.photos/id/10/48' },
  { id: 'doctor_strange', name: 'Doctor Strange', role: CharacterRole.Strategist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/20/48' },
  { id: 'groot', name: 'Groot', role: CharacterRole.Vanguard, subRole: SubRole.FortressTank, iconUrl: 'https://picsum.photos/id/30/48' },
  { id: 'hulk', name: 'Hulk', role: CharacterRole.Vanguard, subRole: SubRole.DiveTank, iconUrl: 'https://picsum.photos/id/40/48' },
  { id: 'iron_man', name: 'Iron Man', role: CharacterRole.Duelist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/50/48' },
  { id: 'loki', name: 'Loki', role: CharacterRole.Strategist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/60/48' },
  { id: 'luna_snow', name: 'Luna Snow', role: CharacterRole.Duelist, subRole: SubRole.Brawl, iconUrl: 'https://picsum.photos/id/70/48' },
  { id: 'magik', name: 'Magik', role: CharacterRole.Duelist, subRole: SubRole.Dive, iconUrl: 'https://picsum.photos/id/80/48' },
  { id: 'magneto', name: 'Magneto', role: CharacterRole.Strategist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/90/48' },
  { id: 'mantis', name: 'Mantis', role: CharacterRole.Strategist, subRole: SubRole.MainHealer, iconUrl: 'https://picsum.photos/id/100/48' },
  { id: 'namor', name: 'Namor', role: CharacterRole.Duelist, subRole: SubRole.Brawl, iconUrl: 'https://picsum.photos/id/110/48' },
  { id: 'peni_parker', name: 'Peni Parker', role: CharacterRole.Vanguard, subRole: SubRole.ShieldTank, iconUrl: 'https://picsum.photos/id/120/48' },
  { id: 'punisher', name: 'Punisher', role: CharacterRole.Duelist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/130/48' },
  { id: 'rocket_raccoon', name: 'Rocket Raccoon', role: CharacterRole.Strategist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/140/48' },
  { id: 'scarlet_witch', name: 'Scarlet Witch', role: CharacterRole.Strategist, subRole: SubRole.Brawl, iconUrl: 'https://picsum.photos/id/150/48' },
  { id: 'spider_man', name: 'Spider-Man', role: CharacterRole.Duelist, subRole: SubRole.Dive, iconUrl: 'https://picsum.photos/id/160/48' },
  { id: 'storm', name: 'Storm', role: CharacterRole.Duelist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/170/48' },
  { id: 'star_lord', name: 'Star-Lord', role: CharacterRole.Duelist, subRole: SubRole.Poke, iconUrl: 'https://picsum.photos/id/180/48' },
];

export const MAPS: MapData[] = [
    { id: 'yggsgard_yggdrasill_path', name: 'Yggsgard: Yggdrasill Path' },
    { id: 'yggsgard_royal_palace', name: 'Yggsgard: Royal Palace' },
    { id: 'tokyo_2099_shin_shibuya', name: 'Tokyo 2099: Shin-Shibuya' },
];

export const INITIAL_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'ShadowBlade',
    mainRole: CharacterRole.Duelist,
    status: PlayerStatus.Active,
    characters: [
      { characterId: 'spider_man', skillLevel: SkillLevel.Master, notes: 'Excels at aggressive flanking maneuvers.' },
      { characterId: 'iron_man', skillLevel: SkillLevel.Expert },
      { characterId: 'punisher', skillLevel: SkillLevel.Proficient },
    ],
    notes: 'Primary duelist, strong mechanical skill.',
    maps: ['yggsgard_yggdrasill_path', 'tokyo_2099_shin_shibuya'],
  },
  {
    id: 'p2',
    name: 'CosmicMind',
    mainRole: CharacterRole.Strategist,
    status: PlayerStatus.Active,
    characters: [
      { characterId: 'doctor_strange', skillLevel: SkillLevel.Master },
      { characterId: 'loki', skillLevel: SkillLevel.Expert, notes: 'Great at mind games and causing chaos.' },
    ],
    notes: 'Main shot-caller and strategist. Excellent game sense.',
    maps: ['yggsgard_royal_palace'],
  },
  {
    id: 'p3',
    name: 'TitanFall',
    mainRole: CharacterRole.Vanguard,
    status: PlayerStatus.Active,
    characters: [
      { characterId: 'hulk', skillLevel: SkillLevel.Expert },
      { characterId: 'groot', skillLevel: SkillLevel.Proficient },
    ],
    notes: 'Reliable vanguard, great at creating space.',
    maps: ['yggsgard_yggdrasill_path', 'yggsgard_royal_palace'],
  },
  {
    id: 'p4',
    name: 'Nyx',
    mainRole: CharacterRole.Strategist,
    status: PlayerStatus.Benched,
    characters: [
      { characterId: 'scarlet_witch', skillLevel: SkillLevel.Proficient },
    ],
    notes: 'Benched for this week, needs to work on communication.',
    maps: [],
  },
  {
    id: 'p5',
    name: 'Rookie',
    mainRole: CharacterRole.Duelist,
    status: PlayerStatus.Trial,
    characters: [
      { characterId: 'star_lord', skillLevel: SkillLevel.Competent },
    ],
    notes: 'On trial, shows promise with duelist characters.',
    maps: ['tokyo_2099_shin_shibuya'],
  },
];

export const SKILL_LEVEL_MAP: { [key in SkillLevel]: string } = {
    [SkillLevel.Novice]: 'Novice',
    [SkillLevel.Competent]: 'Competent',
    [SkillLevel.Proficient]: 'Proficient',
    [SkillLevel.Expert]: 'Expert',
    [SkillLevel.Master]: 'Master',
};

export const ROLE_COLORS: { [key in CharacterRole]: string } = {
    [CharacterRole.Duelist]: 'text-red-400',
    [CharacterRole.Vanguard]: 'text-sky-400',
    [CharacterRole.Strategist]: 'text-emerald-400',
};