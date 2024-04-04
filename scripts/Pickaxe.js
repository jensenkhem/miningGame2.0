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
            damage: getRandomInt(baseAttributes.damage * 0.75, baseAttributes.damage * 1.25),
            critChance: getRandomFloat(baseAttributes.critChance * 0.75, baseAttributes.critChance * 1.25),
        }
    }
    
    // Get the color of the pickaxe based on the damage in relation to the base attributes
    getColor(attribute) {
        const minRedRange = 0.75 * this.baseAttributes[attribute];
        const maxRedRange = 0.9 * this.baseAttributes[attribute];
        const minGreenRange = 0.9 * this.baseAttributes[attribute];
        const maxGreenRange = 1.1 * this.baseAttributes[attribute];
        switch(true) {
            case (this.attributes[attribute] >= minRedRange && this.attributes[attribute] < maxRedRange):
                return 'red';
            case (this.attributes[attribute] >= minGreenRange && this.attributes[attribute] < maxGreenRange):
                return 'green';
            default:
                return 'blue';
        }
    }
}