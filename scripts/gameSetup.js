function setupOreHandlers(player, log) {
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
}

function setupShopHandlers(player, log) {
    buyBronzePickaxeDOMElement.onclick = () => {
        player.buyPickaxe("bronze", log);
    }
    buyIronPickaxeDOMElement.onclick = () => {
        player.buyPickaxe("iron", log);
    }
    buyMithrilPickaxeDOMElement.onclick = () => {
        player.buyPickaxe("mithril", log);
    }
    buyAdamantPickaxeDOMElement.onclick = () => {
        player.buyPickaxe("adamant", log);
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
     renderCurrentOreData(player);
     configureEvents(player, log);
 }