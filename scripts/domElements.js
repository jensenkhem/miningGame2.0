// Main file for anything DOM related

const bronzeDOMElement = document.getElementById("playerBronze");
const ironDOMElement = document.getElementById("playerIron");
const steelDOMElement = document.getElementById("playerSteel");
const mithrilDOMElement = document.getElementById("playerMithril");

const pickaxeNameDOMElement = document.getElementById("pickaxeName");
const pickaxeDamageDOMElement = document.getElementById("pickaxeDamage");

const buyBronzePickaxeDOMElement = document.getElementById("test")

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
    steelDOMElement.innerHTML = "Steel: " + player.resources.steel;
    mithrilDOMElement.innerHTML = "Mithril: " + player.resources.mithril;
}

// Renders the player's pickaxe data onto the DOM
function renderPickaxeData(player) {
    pickaxeNameDOMElement.innerHTML = player.pickaxe.name;
    pickaxeNameDOMElement.style.fontWeight = "bold";
    pickaxeDamageDOMElement.innerHTML = "Damage: " + player.pickaxe.attributes.damage;
    pickaxeDamageDOMElement.style.color = player.pickaxe.color;
}
