// Main file for anything DOM related

const levelDOMElement = document.getElementById("playerLevel");
const expDOMElement = document.getElementById("levelExp");

const bronzeDOMElement = document.getElementById("playerBronze");
const ironDOMElement = document.getElementById("playerIron");
const mithrilDOMElement = document.getElementById("playerMithril");
const adamantDOMElement = document.getElementById("playerAdamant");
const runeDOMElement = document.getElementById("playerRune");

const playerEnchantmentsDOMElement = document.getElementById("enchantmentStuffDetailed");
const enchantmentCoresDOMElement = document.getElementById("enchantmentCores");
const enchantmentDOMElements = [
    document.getElementById("enchantment1"),
    document.getElementById("enchantment2"),
    document.getElementById("enchantment3")
];

const hiddenEnchantmentMessageDOMElement = document.getElementById("hiddenEnchantMessage");

const enchantmentTierDOMElement = document.getElementById("enchantmentTier");

const pickaxeNameDOMElement = document.getElementById("pickaxeName");
const pickaxeDamageDOMElement = document.getElementById("pickaxeDamage");
const pickaxeCritChanceDOMElement = document.getElementById("pickaxeCritChance");

const upgradePickaxeDOMElement = document.getElementById("pickaxeUpgradeButton");
const reforgePickaxeDOMElement = document.getElementById("reforgePickaxeButton");

const buyBronzePickaxeDOMElement = document.getElementById("bronzePickaxeUpgradeButton");
const buyIronPickaxeDOMElement = document.getElementById("ironPickaxeUpgradeButton");
const buyMithrilPickaxeDOMElement = document.getElementById("mithrilPickaxeUpgradeButton");
const buyAdamantPickaxeDOMElement = document.getElementById("adamantPickaxeUpgradeButton");
const buyRunePickaxeDOMElement = document.getElementById("runePickaxeUpgradeButton");

const currentOreNameDOMElement = document.getElementById("currentOreName");
const currentOreHealthDOMElement = document.getElementById("currentOreHealth");
const playerTickRateDOMElement = document.getElementById("playerTickRate");

const bronzePictureDOMElement = document.getElementById("bronzeOre");
const ironPictureDOMElement = document.getElementById("ironOre");
const mithrilPictureDOMElement = document.getElementById("mithrilOre");
const adamantPictureDOMElement = document.getElementById("adamantOre");
const runePictureDOMElement = document.getElementById("runeOre");

const tickRateButtonDOMElement = document.getElementById("testReduceTickRate");


const logDOMElements = [
    document.getElementById("logRow1"), 
    document.getElementById("logRow2"), 
    document.getElementById("logRow3"), 
    document.getElementById("logRow4"), 
    document.getElementById("logRow5")
];

// Function which renders the player's resources onto the DOM
function renderPlayerData(player) {
    bronzeDOMElement.innerHTML = "Bronze: " + player.resources.bronze;
    ironDOMElement.innerHTML = "Iron: " + player.resources.iron;
    mithrilDOMElement.innerHTML = "Mithril: " + player.resources.mithril;
    adamantDOMElement.innerHTML = "Adamant: " + player.resources.adamant;
    runeDOMElement.innerHTML = "Rune: " + player.resources.rune;
    levelDOMElement.innerHTML = "Player Level: " + player.level;
    expDOMElement.innerHTML = "Exp: " + player.currentExp + "/" + player.maxExp;
    playerTickRateDOMElement.innerHTML = "Mining rate: " + player.tickRate + " ms";
    if(player.level >= 30) {
        playerEnchantmentsDOMElement.style.visibility = "visible";
        hiddenEnchantmentMessageDOMElement.style.visibility = "hidden";
        hiddenEnchantmentMessageDOMElement.style["max-height"] = 0;
        playerEnchantmentsDOMElement.style["max-height"] = 1000;
        enchantmentTierDOMElement.innerHTML = "Tier: " + enchantmentTierDictionary[player.enchantmentTier.toString()].tier;
        enchantmentTierDOMElement.style.color =  enchantmentTierDictionary[player.enchantmentTier.toString()].color;
        enchantmentCoresDOMElement.innerHTML = "Enchantment Cores: " + player.enchantmentCores;
    } else {
        playerEnchantmentsDOMElement.style.visibility = "hidden";
        playerEnchantmentsDOMElement.style["max-height"] = 0;
    }
}



// Renders the player's pickaxe data onto the DOM
function renderPickaxeData(player) {
    pickaxeNameDOMElement.innerHTML = player.pickaxe.name;
    pickaxeNameDOMElement.style.fontWeight = "bold";
    console.log(player.pickaxe.attributes.damage);
    pickaxeDamageDOMElement.innerHTML = "Damage: " + player.pickaxe.attributes.damage  + "/" + Math.floor(player.pickaxe.baseAttributes.damage * 1.25) + " (+" + (player.level * 10 + player.level * player.bonusLevelDamage) + " level bonus)";
    pickaxeDamageDOMElement.style.color = player.pickaxe.damageColor;
    pickaxeCritChanceDOMElement.innerHTML = "Crit Chance: " + player.pickaxe.attributes.critChance + "/" + Math.round( player.pickaxe.baseAttributes.critChance * 1.25 * 100) / 100;
    pickaxeCritChanceDOMElement.style.color = player.pickaxe.critColor;
}

function renderCurrentOreData(player) {
    currentOreNameDOMElement.innerHTML = player.currentOre.name;
    currentOreHealthDOMElement.innerHTML = "Health: " + player.currentOre.currentHealth + " / " + player.currentOre.maxHealth;
}
