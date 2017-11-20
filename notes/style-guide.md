# Angular Style Guide
Curated notes taken from [the official Angular style guide](https://angular.io/guide/styleguide).
These notes are meant more as a reminder to myself that I can quickly glance
back on and digest, rather than as a comprehensive guide. I've also picked
certain rules that I strongly agree on and omitted rules that I disagree with,
making this opionated.

# Principles
- [The Single Responsibility Principle](https://www.wikiwand.com/en/Single_responsibility_principle)

# Guidelines
- Code Length
    - Limit files to 400 lines of code.
    - Limit functions to 75 lines of code.
- Character Limits
    - Aim to limit code to 80 characters. 
    - If needed, go up to 100. 
    - If inserting links, ignore line limits.

# Naming
- General Rules
    - Be consistent.
    - Be explicit.
- Files
    - feature.type.ts
    - Features: "game", "map", etc.
    - Types: service, component, pipe, module, directive, etc.
    - Seperate features with multiple words using dashes, e.g. "game-list"
- Classes
    - Upper camel case for class names.
    - For data services (named after nouns):
        - Suffix class names with what they are, e.g. MapService, GameComponent, etc.
        - If service names are verbs (e.g. "Logger") then it is not necessary to add a suffix.
    - 
