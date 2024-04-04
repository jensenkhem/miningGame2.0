// Function which creates a pickaxe given a type
function createPickaxe(type) {
    return new Pickaxe(nameDictionary[type], baseAttributesDictionary[type], costDictionary[type]);
}

// Function which gets a random integer between a given range
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// Formats a date into a human readable timestamp
function formatDate(date) {
    var month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Adding leading zeros if necessary
    month = (month < 10) ? "0" + month : month;
    day = (day < 10) ? "0" + day : day;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    // Format: month/day/year/hour:minutes
    return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
}