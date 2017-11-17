interface SuperHero {
  powers: string[];
  savesTheDay: () => void;
}

let dazzler: SuperHero = {
  powers: ["transduces sonic vibrations into light"],
  savesTheDay() { console.log(`GoodGuy ${this.powers}`); }
};

interface BadGuy {
  badDeeds: string[];
  getRandomBadDeed: () => string;
  commitBadDeed: () => void;
}

let badGuy: BadGuy = {
  badDeeds: ["farts on old people"],
  getRandomBadDeed() { return this.badDeeds; },
  commitBadDeed() { console.log(`BadGuy ${this.getRandomBadDeed()}`); }
};


function saveDayOrBadDeed(something: SuperHero | BadGuy) {
  if ((something as SuperHero).powers) {
    (something as SuperHero).savesTheDay();
  } else {
    (something as BadGuy).commitBadDeed();
  }
}

saveDayOrBadDeed(dazzler);
saveDayOrBadDeed(badGuy);
