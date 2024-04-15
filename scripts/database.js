// Game Database
const costDictionary = {
    "bronze": {bronze: 50, iron: 0, steel: 0, mithril: 0}, 
    "iron": {bronze: 0, iron: 50, steel: 0, mithril: 0}
};
const baseAttributesDictionary = {
    "bronze": {damage: 100, critChance: 0.05, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 1}, 
    "iron": {damage: 250, critChance: 0.10, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 2}
};
const nameDictionary = {
    "bronze": "Bronze Pickaxe", 
    "iron": "Iron Pickaxe"
};
const oreDictionary = {
    "bronze": {name: "Bronze Ore", maxHealth: 500, defense: 100, exp: 75}, 
    "iron": {name: "Iron Ore", maxHealth: 2500, defense: 200, exp: 50}
};