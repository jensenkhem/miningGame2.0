// Main entrypoint

// Runs when the page is ready!
document.addEventListener("DOMContentLoaded", function() {
    let player = new Player();
    let log = new Log(logDOMElements);
    setupGame(player, log);
})
