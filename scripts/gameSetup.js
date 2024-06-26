function setupOreHandlers(player, log) {
    stonePictureDOMElement.onclick = () => {
        player.switchOre("stone", log);
    }
    bronzePictureDOMElement.onclick = () => {
        player.switchOre("bronze", log);
    }
    ironPictureDOMElement.onclick = () => {
        player.switchOre("iron", log);
    }
    mithrilPictureDOMElement.onclick = () => {
        player.switchOre("mithril", log);
    }
    adamantPictureDOMElement.onclick = () => {
        player.switchOre("adamant", log);
    }
    runePictureDOMElement.onclick = () => {
        player.switchOre("rune", log);
    }
}

function setupShopHandlers(player, log) {
    upgradePickaxeDOMElement.onclick = () => {
        player.upgradePickaxe(log);
    }
    reforgePickaxeDOMElement.onclick = () => {
        player.reforgePickaxe(log);
    }
    upgradeForgeButtonDOMElement.onclick = () => {
        player.upgradeForge(log);
    }
    stoneMinerBuyButtonDOMElement.onclick = () => {
        player.buyMiner("stone", log);
    }
}

// Function which configures event listeners for the game given a player
function configureEvents(player, log) {
    // Setup the shop handlers
    setupShopHandlers(player, log);
    // Set up the ore switching handlers
    setupOreHandlers(player, log);
    document.getElementById("enchant").onclick = () => {
        player.rerollEnchantments(log);
    }
    // Set up the main game loop interval
    player.interval = setInterval(() => { player.mine(log) }, player.tickRate);
 }
 
 // Function which given a player, sets up the DOM and events and everything needed to start playing
 function setupGame(player, log) {
     renderPlayerData(player);
     renderPickaxeData(player);
     renderShopData(player);
     renderCurrentOreData(player);
     configureEvents(player, log);
 }