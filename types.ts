export enum PlayerStatus {
  Active = 'Active',
  Benched = 'Benched',
  Trial = 'Trial',
  Inactive = 'Inactive',
}

export enum CharacterRole {
  Duelist = 'Duelist',
  Vanguard = 'Vanguard',
  Strategist = 'Strategist',
}

export enum SubRole {
    Poke = 'Poke',
    Brawl = 'Brawl',
    Dive = 'Dive',
    MainHealer = 'Main Healer',
    OffHealer = 'Off-Healer',
    ShieldTank = 'Shield Tank',
    DiveTank = 'Dive Tank',
    FortressTank = 'Fortress Tank',
}

export enum SkillLevel {
  Novice = 1,
  Competent = 2,
  Proficient = 3,
  Expert = 4,
  Master = 5,
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  subRole: SubRole;
  iconUrl: string;
}

export interface PlayerCharacter {
  characterId: string;
  skillLevel: SkillLevel;
  notes?: string;
}

export interface Player {
  id: string;
  name: string;
  mainRole: CharacterRole;
  status: PlayerStatus;
  characters: PlayerCharacter[];
  notes: string;
  maps: string[];
}

export interface MapData {
    id: string;
    name: string;
}

export interface TeamCompPlayer {
    playerId: string;
    characterId: string;
}

export interface TeamComposition {
    id: string;
    name: string;
    players: TeamCompPlayer[];
    mapIds: string[];
    notes: string;
}
