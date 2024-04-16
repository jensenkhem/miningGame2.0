// Game Database
const costDictionary = {
    "bronze": {bronze: 50, iron: 0, mithril: 0}, 
    "iron": {bronze: 0, iron: 50, mithril: 0},
    "mithril": {bronze: 0, iron: 25, mithril: 50},

};
const baseAttributesDictionary = {
    "bronze": {damage: 100, critChance: 0.05, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 1}, 
    "iron": {damage: 250, critChance: 0.10, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 2},
    "mithril": {damage: 750, critChance: 0.15, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 3}

};
const nameDictionary = {
    "bronze": "Bronze Pickaxe", 
    "iron": "Iron Pickaxe",
    "mithril": "Mithril Pickaxe"

};
const oreDictionary = {
    "bronze": {name: "Bronze Ore", maxHealth: 500, defense: 100, exp: 75}, 
    "iron": {name: "Iron Ore", maxHealth: 2500, defense: 200, exp: 200},
    "mithril": {name: "Mithril Ore", maxHealth: 10000, defense: 350, exp: 500},
};