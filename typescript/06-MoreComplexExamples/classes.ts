class ComicBookCharacter {
  constructor(public alias: string,
    public health: number,
    public strength: number,
    protected secretIdentity: string) { }
}

class SuperHero extends ComicBookCharacter {
  traits = ["empathy", "strong moral code"];
  getSecretID() { console.log(this.secretIdentity); }
}

class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plans"];

  constructor(a, b, c, d) {
    super(a, b, c, d);
    console.log(`${this.alias} eats kittens!`);
  }
}

let batman = new SuperHero("Batman", 100, 20, "Bruce Wayne");
let joker = new SuperVillain("Joker", 50, 70, "Jack Napier");

console.log(batman);
batman.getSecretID();
console.log(joker);
