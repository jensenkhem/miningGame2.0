// Main file for anything DOM related

const levelDOMElement = document.getElementById("playerLevel");
const expDOMElement = document.getElementById("levelExp");

const stoneDOMElement = document.getElementById("playerStone");
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
const pickaxeUpgradeButtonTextDOMElement = document.getElementById("pickaxeUpgradeButtonText")
const pickaxeUpgradeButtonTooltip = document.getElementById("pickaxeUpgradeButtonTooltip");
const reforgePickaxeDOMElement = document.getElementById("reforgePickaxeButton");
const reforgePickaxeTooltipDOMElement = document.getElementById("reforgeUpgradeButtonTooltip");

const upgradeForgeButtonDOMElement = document.getElementById("forgeUpgradeButton");
const upgradeForgeButtonTextDOMElement = document.getElementById("forgeUpgradeButtonText");
const upgradeForgeButtonTooltipDOMElement = document.getElementById("forgeUpgradeButtonTooltip");

const stoneMinersTextDOMElement = document.getElementById("stoneMinersText");
const stoneMinerBuyButtonDOMElement = document.getElementById("stoneMinerBuyButton");

const currentOreNameDOMElement = document.getElementById("currentOreName");
const currentOreHealthDOMElement = document.getElementById("currentOreHealth");
const playerTickRateDOMElement = document.getElementById("playerTickRate");

const stonePictureDOMElement = document.getElementById("stoneOre");
const bronzePictureDOMElement = document.getElementById("bronzeOre");
const ironPictureDOMElement = document.getElementById("ironOre");
const mithrilPictureDOMElement = document.getElementById("mithrilOre");
const adamantPictureDOMElement = document.getElementById("adamantOre");
const runePictureDOMElement = document.getElementById("runeOre");

const tickRateButtonDOMElement = document.getElementById("testReduceTickRate");

// Generic upgrades section
const expUpgrade1ButtonDOMElement = document.getElementById("expUpgrade1Button");
const expUpgrade1ButtonTextDOMElement = document.getElementById("expUpgrade1Text");
const expUpgrade1ButtonTooltipDOMElement = document.getElementById("expUpgrade1Tooltip");

const expUpgrade2ButtonDOMElement = document.getElementById("expUpgrade2Button");
const expUpgrade2ButtonTextDOMElement = document.getElementById("expUpgrade2Text");
const expUpgrade2ButtonTooltipDOMElement = document.getElementById("expUpgrade2Tooltip");

const expUpgrade3ButtonDOMElement = document.getElementById("expUpgrade3Button");
const expUpgrade3ButtonTextDOMElement = document.getElementById("expUpgrade3Text");
const expUpgrade3ButtonTooltipDOMElement = document.getElementById("expUpgrade3Tooltip");

const expUpgrade4ButtonDOMElement = document.getElementById("expUpgrade4Button");
const expUpgrade4ButtonTextDOMElement = document.getElementById("expUpgrade4Text");
const expUpgrade4ButtonTooltipDOMElement = document.getElementById("expUpgrade4Tooltip");

const expUpgrade5ButtonDOMElement = document.getElementById("expUpgrade5Button");
const expUpgrade5ButtonTextDOMElement = document.getElementById("expUpgrade5Text");
const expUpgrade5ButtonTooltipDOMElement = document.getElementById("expUpgrade5Tooltip");


const logDOMElements = [
    document.getElementById("logRow1"), 
    document.getElementById("logRow2"), 
    document.getElementById("logRow3"), 
    document.getElementById("logRow4"), 
    document.getElementById("logRow5")
];

// Function which renders the player's resources onto the DOM
function renderPlayerData(player) {
    stoneDOMElement.innerHTML = "Stone: " + player.resources.stone;
    bronzeDOMElement.innerHTML = "Bronze: " + player.resources.bronze;
    ironDOMElement.innerHTML = "Iron: " + player.resources.iron;
    mithrilDOMElement.innerHTML = "Mithril: " + player.resources.mithril;
    adamantDOMElement.innerHTML = "Adamant: " + player.resources.adamant;
    runeDOMElement.innerHTML = "Rune: " + player.resources.rune;
    levelDOMElement.innerHTML = "Player Level: " + player.level;
    expDOMElement.innerHTML = "Exp: " + player.currentExp + "/" + player.maxExp;
    stoneMinersTextDOMElement.innerHTML = "Stone miners: " + player.miners["stone"];
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
    pickaxeDamageDOMElement.innerHTML = "Damage: " + player.pickaxe.attributes.damage  + "/" + Math.floor(player.pickaxe.baseAttributes.damage * 1.25) + " (+" + (player.level * 10 + player.level * player.bonusLevelDamage) + " level bonus)";
    pickaxeDamageDOMElement.style.color = player.pickaxe.damageColor;
    pickaxeCritChanceDOMElement.innerHTML = "Crit Chance: " + Math.round((player.pickaxe.attributes.critChance + (player.critMultiplier * player.pickaxe.attributes.critChance)) * 100) / 100 + "/" + Math.round((player.pickaxe.baseAttributes.critChance + (player.critMultiplier * player.pickaxe.attributes.critChance)) * 1.25 * 100) / 100;
    pickaxeCritChanceDOMElement.style.color = player.pickaxe.critColor;
    // Reforge stuff
    let type = "wood"
    if(player.pickaxe.baseAttributes.tier == 0) {
        type = "wood";
    } else if(player.pickaxe.baseAttributes.tier == 1) {
        type = "bronze";
    } else if(player.pickaxe.baseAttributes.tier == 2) {
        type = "iron";
    } else if(player.pickaxe.baseAttributes.tier == 3) {
        type = "mithril";
    } else if(player.pickaxe.baseAttributes.tier == 4) {
        type = "adamant";
    } 
    else if(player.pickaxe.baseAttributes.tier == 5) {
        type = "rune";
    } 
    if(player.pickaxe.baseAttributes.tier == 0) {
        reforgePickaxeTooltipDOMElement.innerHTML = "Cannot reforge wood pickaxe!"
    } else {
        reforgePickaxeTooltipDOMElement.innerHTML = "Cost: " + costDictionary[type].reforge[type] + " " + type;
    }
}

function renderCurrentOreData(player) {
    currentOreNameDOMElement.innerHTML = player.currentOre.name;
    currentOreHealthDOMElement.innerHTML = "Health: " + player.currentOre.currentHealth + " / " + player.currentOre.maxHealth;
}

function renderShopData(player) {
    let cutName = player.pickaxe.name.split(" ")[0];
    pickaxeUpgradeButtonText.innerHTML = "Upgrade pickaxe: " + "(Current: " + cutName + ")";
    if(cutName == "Bronze") {
        pickaxeUpgradeButtonTooltip.innerHTML = "Cost: 50 Iron";
    } else if(cutName == "Iron") {
        pickaxeUpgradeButtonTooltip.innerHTML = "Cost: 25 Iron, 50 Mithril";
    } else if(cutName == "Mithril") {
        pickaxeUpgradeButtonTooltip.innerHTML = "Cost: 100 Mithril, 100 Adamant";
    }
    else if(cutName == "Adamant") {
        pickaxeUpgradeButtonTooltip.innerHTML = "Cost: 100 Mithril, 100 Adamant, 100 Rune";
    }
    else if(cutName == "Rune") {
        pickaxeUpgradeButtonTooltip.innerHTML = "MAX";
    }
    // Okay, so here we need to show upgrades that haven't been bought yet, assuming that the forge is at the correct level
    // Maybe lets have an if statement for all the buttons lol?
    upgradeForgeButtonTextDOMElement.innerHTML = "Upgrade forge: " + "(Current: " + capitalizeFirstLetter(player.forge) + ")";
    switch(player.forge) {
        case "bronze":
            // Function to make all upgrades invisible should go here
            // Then make the bronze forge elements appear
            upgradeForgeButtonTooltipDOMElement.innerHTML = "Cost: 50 Iron";
            // expUpgrade1ButtonDOMElement.style.visibility = "visible";
            break;
        case "iron":
            upgradeForgeButtonTooltipDOMElement.innerHTML = "Cost: 25 Iron, 50 Mithril";
            break;
        case "mithril":
            upgradeForgeButtonTooltipDOMElement.innerHTML = "Cost: 100 Mithril, 100 Adamant";
            break;
        case "adamant":
            upgradeForgeButtonTooltipDOMElement.innerHTML = "Cost: 100 Mithril, 100 Adamant, 100 Rune";
            break;
        case "rune":
            upgradeForgeButtonTooltipDOMElement.innerHTML = "MAX";
            break;
    }
}
