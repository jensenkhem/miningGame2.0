// Main entrypoint

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
