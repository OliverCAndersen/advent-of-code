"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run04B = exports.run04A = void 0;
const fs_1 = require("fs");
function run04A() {
    console.log('Running 04A');
    const fileContent = (0, fs_1.readFileSync)('./input/04/input.txt', 'utf-8');
    var sum = 0;
    fileContent.split(/\r?\n/).forEach(line => {
        var lineWithoutCardId = line.split(":")[1];
        var winningAndMyNumbersStrings = lineWithoutCardId.split("|");
        var winningNumbersString = winningAndMyNumbersStrings[0];
        var myNumbersString = winningAndMyNumbersStrings[1];
        var winningNumbersRegexMatch = winningNumbersString.match(/\d+/g);
        if (winningNumbersRegexMatch == null)
            return;
        var winningNumbers = new Array();
        winningNumbersRegexMatch.forEach(numberString => winningNumbers.push(+numberString));
        var myNumbersRegexMatch = myNumbersString.match(/\d+/g);
        if (myNumbersRegexMatch == null)
            return;
        var myNumbers = new Array();
        myNumbersRegexMatch.forEach(numberString => myNumbers.push(+numberString));
        var intersectingNumbers = myNumbers.filter(num => winningNumbers.includes(num));
        //console.log(line + " => " + "     =>     W[" + winningNumbers + "] My[" + myNumbers + "] => " + intersectingNumbers)
        if (intersectingNumbers.length == 0)
            return;
        // 1 score for the first card
        var cardScore = 1;
        // then double the score with each extra match after that
        if (intersectingNumbers.length > 1)
            cardScore = Math.pow(2, intersectingNumbers.length - 1);
        //console.log("Game has " + intersectingNumbers.length + " winning numbers. Adding Card Score: " + cardScore + " Winning numbers: " + intersectingNumbers)
        sum += cardScore;
    });
    console.log("Winning cards score sum: " + sum);
}
exports.run04A = run04A;
function run04B() {
    console.log('Running 04B');
}
exports.run04B = run04B;
