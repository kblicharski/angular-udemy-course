interface AttackFunction {
  (opponent: { alias: string; health: number; }, attackWith: number): number;
}

interface KrustyTheClown {
  alias: string;
  health: number;
  inebriationLevel: number;
  attack: AttackFunction;
}

interface OptionalAttributes {
  strength?: number;
  insanity?: number;
}
interface ComicBookCharacter extends OptionalAttributes {
  secretIdentity?: string;
  alias: string;
  health: number;
  attack: AttackFunction;
}

function attackFunc(opponent, attackWith) {
  opponent.health -= attackWith;
  console.log(`${this.alias} attacked ${opponent.alias}, whose health = ${opponent.health}`);
  return opponent.health;
}

let superHero: ComicBookCharacter = {
  alias: "She-Hulk",
  health: 5000,
  strength: 5000,
  attack: attackFunc
};

let superVillain: ComicBookCharacter = {
  secretIdentity: "Jack Napier",
  alias: "Joker",
  health: 75,
  insanity: 145,
  attack: attackFunc
};

function getSecretIdentity(character: ComicBookCharacter) {
  if (character.secretIdentity) {
    console.log(`${character.alias} is ${character.secretIdentity}`);
  } else {
    console.log(`${character.alias} has no secret identity`);
  }
}

getSecretIdentity(superHero);
