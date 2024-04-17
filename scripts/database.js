// Game Database
const costDictionary = {
    "bronze": {bronze: 50, iron: 0, mithril: 0, adamant: 0, rune: 0}, 
    "iron": {bronze: 0, iron: 50, mithril: 0, adamant: 0, rune: 0},
    "mithril": {bronze: 0, iron: 25, mithril: 50, adamant: 0, rune: 0},
    "adamant": {bronze: 0, iron: 0, mithril: 100, adamant: 100, rune: 0},
    "rune": {bronze: 0, iron: 0, mithril: 100, adamant: 100, rune: 100},

};
const baseAttributesDictionary = {
    "bronze": {damage: 100, critChance: 0.05, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 1}, 
    "iron": {damage: 250, critChance: 0.10, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 2},
    "mithril": {damage: 750, critChance: 0.15, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 3},
    "adamant": {damage: 2500, critChance: 0.15, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2, tier: 4},
    "rune": {damage: 10000, critChance: 0.20, lowMultiplier: 0.75, highMultiplier: 1.25, critDamageMultiplier: 2.5, tier: 5},
};
const nameDictionary = {
    "bronze": "Bronze Pickaxe", 
    "iron": "Iron Pickaxe",
    "mithril": "Mithril Pickaxe",
    "adamant": "Adamant Pickaxe",
    "rune": "Rune Pickaxe",
};
const oreDictionary = {
    "bronze": {name: "Bronze Ore", maxHealth: 500, defense: 100, exp: 75}, 
    "iron": {name: "Iron Ore", maxHealth: 2500, defense: 200, exp: 200},
    "mithril": {name: "Mithril Ore", maxHealth: 7500, defense: 350, exp: 500},
    "adamant": {name: "Adamant Ore", maxHealth: 30000, defense: 1000, exp: 2000},
    "rune": {name: "Rune Ore", maxHealth: 100000, defense: 5000, exp: 10000},
};


// Want a feature where you spend 1 enchantment core to reroll your 3 enchantments and possibly tier up
    // common - unbcommon - rare - unique - legendary - mythic
    // Types of enchantments
    // - Tick rate modifier by some %, multiplicative
    // - Increased damage from level bonus (+ some fixed num)
    // - % Damage increase to base pickaxe damage?
    // - flat + multiplicative increase to crit chance?
    // - increased ore per mine
    // - faster exp gain

const enchantmentTierDictionary = {
    "1": {
        "color": "grey",
        "tier": "Common",
        "tierUpChance": 0.15,
    },
    "2": {
        "color": "green",
        "tier": "Uncommon",
        "tierUpChance": 0.10,
    },
    "3": {
        "color": "blue",
        "tier": "Rare",
        "tierUpChance": 0.07,
    },
    "4": {
        "color": "orange",
        "tier": "Unique",
        "tierUpChance": 0.05,
    },
    "5": {
        "color": "#32cd32",
        "tier": "Legendary",
        "tierUpChance": 0.03,
    },
    "6": {
        "color": "#FFEA00",
        "tier": "Mythic",
        "tierUpChance": 0,
    }
}

const enchantmentDictionary = {
    "tickRate": {
        "1": [0.97, 0.96, 0.95],
        "2": [0.94, 0.93, 0.92],
        "3": [0.91, 0.90, 0.89],
        "4": [0.88, 0.87, 0.86],
        "5": [0.85, 0.84, 0.83],
        "6": [0.82, 0.81, 0.80],
    },
    "expGain": {
        "1": [0.05, 0.10, 0.15],
        "2": [0.20, 0.25, 0.30],
        "3": [0.35, 0.40, 0.45],
        "4": [0.50, 0.55, 0.60],
        "5": [0.65, 0.70, 0.75],
        "6": [0.80, 0.90, 1],
    },
    "bonusLevelDamage": {
        "1": [1, 2, 3],
        "2": [4, 5, 6],
        "3": [7, 8, 9],
        "4": [10, 11, 12],
        "5": [13, 14, 15],
        "6": [18, 19, 20],
    }
}