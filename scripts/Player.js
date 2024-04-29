// Main player class
class Player {
    constructor() {
        this.level = 1;
        this.currentExp = 0;
        this.maxExp = 100;
        this.expEnchantmentMultiplier = 0;
        this.baseExpEnchantmentMultipler = 0;
        this.bonusLevelDamage = 0;
        this.resources = {
            bronze: 0,
            iron: 0,
            mithril: 0,
            adamant: 0,
            rune: 0,
        }
        this.enchantmentCores = 0;
        this.enchantmentTier = 1;
        // Start the player off with a bronze pickaxe when constructed
        this.pickaxe = createPickaxe("bronze");
        this.currentOre = new Ore("bronze");
        this.tickRate = 2500;
        this.baseTickRate = 2500;
        this.missThreshold = 0.5;
        this.maxAccThreshold = 1.5;
        this.oreGainMax = 5;
        this.interval = null;
        this.luck = 0.05;
    }

    // Method for seeing if you can afford a new pickaxe
    canAffordPickaxe(type) {
        if (
            this.resources.bronze >= costDictionary[type].bronze &&
            this.resources.iron >= costDictionary[type].iron &&
            this.resources.mithril >= costDictionary[type].mithril
        ) {
            return true;
        }
        return false;
    }

    // Level up
    levelup() {
        while(this.currentExp >= this.maxExp) {
            this.level += 1;
            this.currentExp = this.currentExp - this.maxExp;
            this.maxExp = Math.floor(this.maxExp *= 1.12);
        }
        renderPlayerData(this);
        renderPickaxeData(this);
    }

    // Method for purchasing a new pickaxe
    buyPickaxe(type, log) {
        let newPickaxe = createPickaxe(type);
        if(newPickaxe.attributes.tier < this.pickaxe.attributes.tier) {
            log.write("This pickaxe is worse than your current one...")    
        } else if (this.canAffordPickaxe(type)) {
            this.resources.bronze -= costDictionary[type].bronze;
            this.resources.iron -= costDictionary[type].iron;
            this.resources.mithril -= costDictionary[type].mithril;
            this.resources.mithril -= costDictionary[type].adamant;
            this.resources.mithril -= costDictionary[type].rune;
            this.pickaxe = createPickaxe(type);
            log.write("Purchased " + this.pickaxe.name + "!");
            renderPickaxeData(this);
            renderPlayerData(this);
        } else {
            log.write("Can not afford!");
        }
    }

    // Method for mining
    mine(log) {
        let damageDealt = this.calculateDamage();
        let levelDamage = this.level * 10 + this.level * this.bonusLevelDamage;
        if(damageDealt == 0) {
            log.write("Missed...");
        } else if (damageDealt > this.pickaxe.attributes.highMultiplier * (this.pickaxe.attributes.damage + levelDamage)) {
            log.write("Critical hit! Damage dealt: " + damageDealt);
        } else {
            log.write("Damage dealt: " + damageDealt);
        }

        this.currentOre.currentHealth -= damageDealt;
        // Check if the ore is destroyed
        if(!this.currentOre.alive()) {
            // Only get one ore for now, probably can change later
            let gainedOre = getRandomInt(1, this.oreGainMax + 1)
            this.resources[this.currentOre.type] += gainedOre;
            if(this.level >= 30) {
                if (Math.random() < this.luck) {
                    this.enchantmentCores += 1;
                    log.write("You see an enchantment core glimmering inside the ore!");
                }
            }
            this.currentExp += this.currentOre.exp + (Math.floor(this.currentOre.exp * this.expEnchantmentMultiplier));
            if(this.currentExp >= this.maxExp) {
                this.levelup();
            }
            if(this.level >= 30 && this.expEnchantmentMultiplier > 0) {
                log.write("Successfully mined " + gainedOre + " " + this.currentOre.type + ". Exp Gained: " + (this.currentOre.exp + Math.floor(this.currentOre.exp * this.expEnchantmentMultiplier)) + " (+ " + (Math.floor(this.currentOre.exp * this.expEnchantmentMultiplier)) + " enchantment bonus exp!)");
            } else {
                log.write("Successfully mined " + gainedOre + " " + this.currentOre.type + ". Exp Gained: " + this.currentOre.exp);
            }
            // Generate a new ore
            let nextOre = new Ore(this.currentOre.type);
            this.currentOre = nextOre;
        }
        // Update the dom
        renderCurrentOreData(this); 
        renderPlayerData(this);
    }

    // Method for calculating the damage done by a pickaxe swing against a particular ore
    calculateDamage() {
        let levelDamage = this.level * 10 + this.level * this.bonusLevelDamage;
        let lowerBound = Math.floor((this.pickaxe.attributes.damage + levelDamage) * this.pickaxe.attributes.lowMultiplier);
        let upperBound = Math.floor((this.pickaxe.attributes.damage + levelDamage) * this.pickaxe.attributes.highMultiplier);
        let damageDealt = getRandomInt(lowerBound, upperBound);

        // Check for crit here
        let didCrit = this.criticalHitCheck();
        if(didCrit) {
            damageDealt *= this.pickaxe.attributes.critDamageMultiplier;
        } 
        // Check for a hit
        let accuracy = this.calculateAccuracy(damageDealt, this.currentOre.defense);
        if (Math.random() > accuracy) {
            damageDealt = 0;
        }
        
        return damageDealt;
    }

    // Calculates a probability of hitting given a damage and a defense
    calculateAccuracy(damage, defense) {
        if (damage > this.maxAccThreshold * defense) {
            return 1;
        } else if (damage < this.missThreshold * defense) {
            return 0;
        } else {
            return (damage - this.missThreshold * defense) / (defense * this.missThreshold);
        }
    }

    // Check for a critical hit
    criticalHitCheck() {
        return Math.random() < this.pickaxe.attributes.critChance;
    }

    // Method to switch ore's given an ore type
    switchOre(type, log) {
        if(type == this.currentOre.type) {
            log.write("Already mining: " + this.currentOre.name + "...");
        } else {
            let newOre = new Ore(type);
            this.currentOre = newOre;
            log.write("Now mining: " + this.currentOre.name);
            renderCurrentOreData(this);
        }
    }

    changeInterval(log) {
        clearInterval(this.interval);
        this.interval = setInterval(() => { this.mine(log) }, this.tickRate);
    }
    
    // Want a feature where you spend 1 enchantment core to reroll your 3 enchantments and possibly tier up
    // common - unbcommon - rare - unique - legendary - mythic
    // Types of enchantments
    // - Tick rate modifier by some %, multiplicative
    // - Increased damage from level bonus (+ some fixed num)
    // - % Damage increase to base pickaxe damage?
    // - flat + multiplicative increase to crit chance?
    // - increased ore per mine
    // - faster exp gain
    tierUpEnchantments(log) {
        let chance = Math.random();
        if (chance < enchantmentTierDictionary[this.enchantmentTier.toString()].tierUpChance) {
            this.enchantmentTier += 1;
        }
    }

    rerollEnchantments(log) {
        // Idea, first check to see if the player can afford to enchant
        if(this.enchantmentCores == 0) {
            log.write("Cannot afford to enchant!");
        } else {
            // Subtract a core
            this.enchantmentCores -= 1;
            // Reset values back to base
            this.resetEnchantments(log);
            // Check for a tier up
            this.tierUpEnchantments(log);
            let e1 = this.rollEnchantment();
            let e2 = this.rollEnchantment();
            let e3 = this.rollEnchantment();
            // Apply the enchantments
            this.applyEnchantment(e1, 1, log);
            this.applyEnchantment(e2, 2, log);
            this.applyEnchantment(e3, 3, log);
            // Display the enchantments
            renderPlayerData(this);
            renderPickaxeData(this);
        }
    }

    resetEnchantments(log) {
        this.tickRate = this.baseTickRate;
        this.expEnchantmentMultiplier = this.baseExpEnchantmentMultipler;
        this.bonusLevelDamage = 0;
        this.changeInterval(log);
    }

    applyEnchantment(enchantment, num, log) {
        let type = enchantment[0];
        let value = enchantment[1];
        switch(type) {
            case "tickRate":
                this.tickRate -= Math.floor(this.baseTickRate * (1 - value));
                this.changeInterval(log);
                enchantmentDOMElements[num - 1].innerHTML = "Mining rate multipler: +" + Math.floor((1 - value) * 100) + "%";
                break;
            case "expGain":
                this.expEnchantmentMultiplier = this.expEnchantmentMultiplier + value;
                enchantmentDOMElements[num - 1].innerHTML = "Exp gain multiplier: +" + Math.floor(value * 100) + "%";
                break;
            case "bonusLevelDamage":
                this.bonusLevelDamage = value;
                enchantmentDOMElements[num - 1].innerHTML = "Bonus level damage: " + "+" + value;
                break;
            default:
                true;
        }
    }

    rollEnchantment() {
         let randomEnchant = getRandomValueFromDict(enchantmentDictionary);
         let newEnchantmentDict = randomEnchant[1];
         let newEnchantmentType = randomEnchant[0];
         let newEnchantmentValue = getRandomFromArray(newEnchantmentDict[this.enchantmentTier.toString()]);
         return [newEnchantmentType, newEnchantmentValue];
    }

}