// Class for everything pickaxe related
class Pickaxe {
    constructor(name, baseAttributes, costObject) {
        this.name = name;
        this.baseAttributes = baseAttributes;
        this.attributes = this.randomModify(baseAttributes);
        this.costObject = costObject;
        this.damageColor = this.getColor("damage");
        this.critColor = this.getColor("critChance");
        this.lowMultiplier = 0.75;
        this.highMultiplier = 1.25;
        this.critDamageMultiplier = 2; 
    }
    
    // Randomly modifies the base attribtues of the pickaxe between a range
    randomModify(baseAttributes) {
        return {
            damage: getRandomInt(baseAttributes.damage * this.lowMultiplier, baseAttributes.damage * this.highMultiplier),
            critChance: getRandomFloat(baseAttributes.critChance * this.lowMultiplier, baseAttributes.critChance * this.highMultiplier),
            tier: baseAttributes.tier
        }
    }
    
    // Get the color of the pickaxe based on the damage in relation to the base attributes
    getColor(attribute) {
        const multDiff = this.highMultiplier - this.lowMultiplier;
        const minRedRange = this.lowMultiplier * this.baseAttributes[attribute];
        const maxRedRange = (this.lowMultiplier + (multDiff / 3)) * this.baseAttributes[attribute];
        const minGreenRange = (this.lowMultiplier + (multDiff / 3)) * this.baseAttributes[attribute];
        const maxGreenRange = (this.lowMultiplier + (multDiff * (2/3))) * this.baseAttributes[attribute];
        switch(true) {
            case (this.attributes[attribute] >= minRedRange && this.attributes[attribute] < maxRedRange):
                return 'red';
            case (this.attributes[attribute] > minGreenRange && this.attributes[attribute] <= maxGreenRange):
                return 'green';
            default:
                return 'blue';
        }
    }
}