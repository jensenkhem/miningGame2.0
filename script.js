// Main script for setting up the game and the DOM

// Function which renders the player's resources onto the DOM
function renderPlayerData(player) {
    document.getElementById("playerBronze").innerHTML = "Bronze: " + player.resources.bronze;
    document.getElementById("playerIron").innerHTML = "Iron: " + player.resources.iron;
    document.getElementById("playerSteel").innerHTML = "Steel: " + player.resources.steel;
    document.getElementById("playerMithril").innerHTML = "Mithril: " + player.resources.mithril;
}

// Function which configures event listeners for the game given a player
function configureEvents(player, log) {
    // Set up the main game loop interval
    setInterval(() => { player.mine(player.currentResource, getRandomInt(1, 6), log) }, player.tickRate);
}

// Function which given a player, sets up the DOM and events and everything needed to start playing
function setupGame(player, log) {
    renderPlayerData(player);
    configureEvents(player, log);
}

// Runs when the page is ready!
document.addEventListener("DOMContentLoaded", function() {
    let player = new Player();
    let log = new Log([document.getElementById("logRow1"), 
                        document.getElementById("logRow2"), 
                        document.getElementById("logRow3"), 
                        document.getElementById("logRow4"), 
                        document.getElementById("logRow5")]);
    setupGame(player, log);
})
