// Class for everything pickaxe related
class Pickaxe {
    constructor(name, baseAttributes, costObject) {
        this.name = name;
        this.baseAttributes = baseAttributes;
        this.attributes = this.randomModify(baseAttributes);
        this.costObject = costObject;
        this.damageColor = this.getColor("damage");
        this.critColor = this.getColor("critChance");
    }
    
    // Randomly modifies the base attribtues of the pickaxe between a range
    randomModify(baseAttributes) {
        return {
            damage: getRandomInt(baseAttributes.damage * baseAttributes.lowMultiplier, baseAttributes.damage * baseAttributes.highMultiplier),
            critChance: getRandomFloat(baseAttributes.critChance * baseAttributes.lowMultiplier, baseAttributes.critChance * baseAttributes.highMultiplier),
            lowMultiplier: baseAttributes.lowMultiplier,
            critDamageMultiplier: baseAttributes.critDamageMultiplier,
            highMultiplier: baseAttributes.highMultiplier,
            tier: baseAttributes.tier
        }
    }
    
    // Get the color of the pickaxe based on the damage in relation to the base attributes
    getColor(attribute) {
        const multDiff = this.attributes.highMultiplier - this.attributes.lowMultiplier;
        const minRedRange = this.attributes.lowMultiplier * this.baseAttributes[attribute];
        const maxRedRange = (this.attributes.lowMultiplier + (multDiff / 3)) * this.baseAttributes[attribute];
        const minGreenRange = (this.attributes.lowMultiplier + (multDiff / 3)) * this.baseAttributes[attribute];
        const maxGreenRange = (this.attributes.lowMultiplier + (multDiff * (2/3))) * this.baseAttributes[attribute];
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