"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run02B = exports.run02A = void 0;
const fs_1 = require("fs");
function run02A() {
    console.log('Running 02A');
    var bagColorAmounts = [12, 13, 14];
    console.log("Bag Contains (RGB): " + bagColorAmounts);
    const fileContent = (0, fs_1.readFileSync)('./input/02/input.txt', 'utf-8');
    var sum = 0;
    fileContent.split(/\r?\n/).forEach(line => {
        var gameIdRegexMatch = line.match(/\d+/);
        if (gameIdRegexMatch == null)
            return;
        var gameId = +gameIdRegexMatch[0];
        var gameHands = parseToColorAmounts(line);
        var allHandsAreWithinLimits = gameHands.every(handAmount => { return handAmount[0] <= bagColorAmounts[0] && handAmount[1] <= bagColorAmounts[1] && handAmount[2] <= bagColorAmounts[2]; });
        if (allHandsAreWithinLimits)
            sum += gameId;
        //console.log("Hand: " + handColorAmounts + " | BagLimits: " + bagColorAmounts)
        console.log("GameId: " + gameId + (allHandsAreWithinLimits ? " - Possible" : " - Not Possible") + " | Hands: " + gameHands);
    });
    console.log("Possible game ID sum: " + sum);
}
exports.run02A = run02A;
function run02B() {
    console.log('Running 02B');
    const fileContent = (0, fs_1.readFileSync)('./input/02/input.txt', 'utf-8');
    var sum = 0;
    fileContent.split(/\r?\n/).forEach(line => {
        var gameIdRegexMatch = line.match(/\d+/);
        if (gameIdRegexMatch == null)
            return;
        var gameId = +gameIdRegexMatch[0];
        var highestGameColorAmounts = [0, 0, 0];
        var gameHands = parseToColorAmounts(line);
        gameHands.forEach(handColorAmounts => {
            highestGameColorAmounts[0] = Math.max(handColorAmounts[0], highestGameColorAmounts[0]);
            highestGameColorAmounts[1] = Math.max(handColorAmounts[1], highestGameColorAmounts[1]);
            highestGameColorAmounts[2] = Math.max(handColorAmounts[2], highestGameColorAmounts[2]);
        });
        var cubePower = highestGameColorAmounts[0] * highestGameColorAmounts[1] * highestGameColorAmounts[2];
        console.log("GameID " + gameId + " => Highest color amounts: " + highestGameColorAmounts + " => Power: " + cubePower);
        sum += cubePower;
    });
    console.log("Sum of all games' Cube Power: " + sum);
}
exports.run02B = run02B;
function parseToColorAmounts(gameString) {
    var allHandAmounts = new Array();
    // Remove the "Game ID" part of the string
    var gameStringWithoutID = gameString.substring(gameString.indexOf(":") + 1);
    // remove whitespaces and split into an array of hands in the game
    var handStrings = gameStringWithoutID.replace(/\s/g, "").split(";");
    // parse each hand
    handStrings.forEach(hand => {
        var handAmounts = [0, 0, 0];
        // parse each color in the hand
        hand.split(",").forEach(colorString => {
            var amountRegExMatch = colorString.match(/\d+/);
            var amount = amountRegExMatch != null ? +amountRegExMatch[0] : 0;
            var colorName = "";
            if (colorString.includes("red")) {
                handAmounts[0] = amount;
                colorName = "red";
            }
            else if (colorString.includes("green")) {
                handAmounts[1] = amount;
                colorName = "green";
            }
            else if (colorString.includes("blue")) {
                handAmounts[2] = amount;
                colorName = "blue";
            }
            //console.log(colorString + " => " + amount + " " + colorName)
        });
        allHandAmounts.push(handAmounts);
    });
    return allHandAmounts;
}
