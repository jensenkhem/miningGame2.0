class Ore {
    constructor(type) {
        this.type = type;
        this.name = oreDictionary[type].name;
        this.maxHealth = oreDictionary[type].maxHealth;
        this.currentHealth = oreDictionary[type].maxHealth;
        this.defense = oreDictionary[type].defense;
        this.exp = oreDictionary[type].exp;
    }
    alive() {
        return this.currentHealth > 0
    }
}