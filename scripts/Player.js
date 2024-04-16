// Main player class
class Player {
    constructor() {
        this.level = 1;
        this.currentExp = 0;
        this.maxExp = 100;
        this.levelDamageBonus = 0;
        this.resources = {
            bronze: 0,
            iron: 0,
            mithril: 0
        }
        this.enchantmentCores = 0;
        // Start the player off with a bronze pickaxe when constructed
        this.pickaxe = createPickaxe("bronze");
        this.currentOre = new Ore("bronze");
        this.tickRate = 2500;
        this.missThreshold = 0.5;
        this.maxAccThreshold = 1.5;
        this.oreGainMax = 5;
        this.interval = null;
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
        this.level += 1;
        this.levelDamageBonus += 10;
        this.currentExp = this.currentExp - this.maxExp;
        this.maxExp = Math.floor(this.maxExp *= 1.12);
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
        if(damageDealt == 0) {
            log.write("Missed...");
        } else if (damageDealt > this.pickaxe.attributes.highMultiplier * (this.pickaxe.attributes.damage + this.level * this.levelDamageBonus)) {
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
            this.currentExp += this.currentOre.exp;
            if(this.currentExp >= this.maxExp) {
                this.levelup();
            }
            log.write("Successfully mined " + gainedOre + " " + this.currentOre.type);
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
        
        let lowerBound = Math.floor((this.pickaxe.attributes.damage + this.levelDamageBonus) * this.pickaxe.attributes.lowMultiplier);
        let upperBound = Math.floor((this.pickaxe.attributes.damage + this.levelDamageBonus) * this.pickaxe.attributes.highMultiplier);
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
        log.write("New interval set: " + this.tickRate + " ms");
        renderPlayerData(this);
    }

}