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

// Function which generates a random float between a given range to two decimal places
function getRandomFloat(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

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

function getRandomValueFromDict(dictionary) {
    // Extract keys from the dictionary object
    let keys = Object.keys(dictionary);
    // Generate a random index within the range of keys
    let randomIndex = Math.floor(Math.random() * keys.length);
    let randomKey = keys[randomIndex];
    // Return both the key and its associated value as an array
    return [randomKey, dictionary[randomKey]];
}

function getRandomFromArray(array) {
    // Generate a random index within the range of the array length
    let randomIndex = Math.floor(Math.random() * array.length);
    // Return the element at the randomly chosen index
    return array[randomIndex];
}