// Main player class
class Player {
    constructor() {
        this.resources = {
            bronze: 10,
            iron: 10,
            steel: 10,
            mithril: 10
        }
        // Start the player off with a bronze pickaxe when constructed
        this.pickaxe = createPickaxe("bronze");
        this.currentOre = new Ore("bronze");
        this.tickRate = 5000;
    }

    // Method for seeing if you can afford a new pickaxe
    canAffordPickaxe(type) {
        if (
            this.resources.bronze >= costDictionary[type].bronze &&
            this.resources.iron >= costDictionary[type].iron &&
            this.resources.steel >= costDictionary[type].steel &&
            this.resources.mithril >= costDictionary[type].mithril
        ) {
            return true;
        }
        return false;
    }

    // Method for purchasing a new pickaxe
    buyPickaxe(type, log) {
        if (this.canAffordPickaxe(type)) {
            this.resources.bronze -= costDictionary[type].bronze;
            this.resources.iron -= costDictionary[type].iron;
            this.resources.steel -= costDictionary[type].steel;
            this.resources.mithril -= costDictionary[type].mithril;
            this.pickaxe = createPickaxe(type);
            log.write("Purchased " + this.pickaxe.name + "!");
            renderPickaxeData(this);
            renderPlayerData(this);
        }
        log.write("Can not afford!");
    }

    // Method for mining
    mine(log) {
        let damageDealt = this.calculateDamage();
        if(damageDealt == 0) {
            log.write("Missed...");
        } else if (damageDealt > 1.25 * this.pickaxe.attributes.damage) {
            log.write("Critical hit! Damage dealt: " + damageDealt);
        } else {
            log.write("Damage dealt: " + damageDealt);
        }

        this.currentOre.currentHealth -= damageDealt;
        // Check if the ore is destroyed
        if(!this.currentOre.alive()) {
            // Only get one ore for now, probably can change later
            this.resources[this.currentOre.type] += 1;
            log.write("Successfully mined 1 " + this.currentOre.type);
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
        let lowerBound = Math.floor(this.pickaxe.attributes.damage * 0.75);
        let upperBound = Math.floor(this.pickaxe.attributes.damage * 1.25);
        let damageDealt = getRandomInt(lowerBound, upperBound);
        // Check for crit here
        let didCrit = this.criticalHitCheck();
        if(didCrit) {
            damageDealt *= 2;
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
        if (damage > 1.5 * defense) {
            return 1;
        } else if (damage < 0.5 * defense) {
            return 0;
        } else {
            //console.log(damage, defense)
            return (damage - 0.5 * defense) / (defense * 0.5);
        }
    }

    // Check for a critical hit
    criticalHitCheck() {
        return Math.random() < this.pickaxe.attributes.critChance;
    }
}