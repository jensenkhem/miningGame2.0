class Pickaxe {
    constructor(name, baseAttributes, costObject) {
        this.name = name;
        this.baseAttributes = baseAttributes;
        this.attributes = this.randomModify(baseAttributes);
        this.costObject = costObject;
        this.color = this.getColor();
    }
  
    randomModify(baseAttributes) {
        const minMultiplier = 0.75;
        const maxMultiplier = 1.25;
        const minDamage = baseAttributes.damage * minMultiplier;
        const maxDamage = baseAttributes.damage * maxMultiplier;
        return {damage: Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage};
    }
  
    getColor() {
        const minRedRange = 0.75 * this.baseAttributes.damage;
        const maxRedRange = 0.9 * this.baseAttributes.damage;
        const minGreenRange = 0.9 * this.baseAttributes.damage;
        const maxGreenRange = 1.1 * this.baseAttributes.damage;
        switch(true) {
            case (this.attributes.damage >= minRedRange && this.attributes.damage < maxRedRange):
                return 'red';
            case (this.attributes.damage >= minGreenRange && this.attributes.damage < maxGreenRange):
                return 'green';
            default:
                return 'blue';
        }
    }
}