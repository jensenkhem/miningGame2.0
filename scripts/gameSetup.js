// Function which configures event listeners for the game given a player
function configureEvents(player, log) {
    buyBronzePickaxeDOMElement.onclick = () => {player.buyPickaxe("bronze", log)}
     // Set up the main game loop interval
     setInterval(() => { player.mine(player.currentResource, getRandomInt(1, 6), log) }, player.tickRate);
 }
 
 // Function which given a player, sets up the DOM and events and everything needed to start playing
 function setupGame(player, log) {
     renderPlayerData(player);
     renderPickaxeData(player);
     configureEvents(player, log);
 }