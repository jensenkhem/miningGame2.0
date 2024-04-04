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
        this.currentResource = "bronze";
        this.tickRate = 1000;
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

    // Method for incrementing a certain resource by an amount
    mine(type, amount, log) {
        this.resources[type] += amount;
        log.write("Mined " + amount + " " + type + "!");
        renderPlayerData(this);
    }
}