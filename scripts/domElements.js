// Main file for anything DOM related

const levelDOMElement = document.getElementById("playerLevel");
const expDOMElement = document.getElementById("levelExp");

const bronzeDOMElement = document.getElementById("playerBronze");
const ironDOMElement = document.getElementById("playerIron");
const mithrilDOMElement = document.getElementById("playerMithril");

const pickaxeNameDOMElement = document.getElementById("pickaxeName");
const pickaxeDamageDOMElement = document.getElementById("pickaxeDamage");
const pickaxeCritChanceDOMElement = document.getElementById("pickaxeCritChance");

const buyBronzePickaxeDOMElement = document.getElementById("bronzePickaxeUpgradeButton");
const buyIronPickaxeDOMElement = document.getElementById("ironPickaxeUpgradeButton");
const buyMithrilPickaxeDOMElement = document.getElementById("mithrilPickaxeUpgradeButton");


const currentOreNameDOMElement = document.getElementById("currentOreName");
const currentOreHealthDOMElement = document.getElementById("currentOreHealth");

const bronzePictureDOMElement = document.getElementById("bronzeOre");
const ironPictureDOMElement = document.getElementById("ironOre");
const mithrilPictureDOMElement = document.getElementById("mithrilOre");


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
    levelDOMElement.innerHTML = "Player Level: " + player.level;
    expDOMElement.innerHTML = "Exp: " + player.currentExp + "/" + player.maxExp;
}

// Renders the player's pickaxe data onto the DOM
function renderPickaxeData(player) {
    pickaxeNameDOMElement.innerHTML = player.pickaxe.name;
    pickaxeNameDOMElement.style.fontWeight = "bold";
    pickaxeDamageDOMElement.innerHTML = "Damage: " + player.pickaxe.attributes.damage + " (+" + player.level * 10 + ")";
    pickaxeDamageDOMElement.style.color = player.pickaxe.damageColor;
    pickaxeCritChanceDOMElement.innerHTML = "Crit Chance: " + player.pickaxe.attributes.critChance;
    pickaxeCritChanceDOMElement.style.color = player.pickaxe.critColor;
}

function renderCurrentOreData(player) {
    currentOreNameDOMElement.innerHTML = player.currentOre.name;
    currentOreHealthDOMElement.innerHTML = "Health: " + player.currentOre.currentHealth + " / " + player.currentOre.maxHealth;
}
