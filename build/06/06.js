"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run06B = exports.run06A = void 0;
const fs_1 = require("fs");
function run06A() {
    console.log('Running 06A');
    const fileContent = (0, fs_1.readFileSync)('./input/06/input.txt', 'utf-8');
    var lines = fileContent.split(/\r?\n/);
    var times = parseNumbersFromLine(lines[0]);
    var distances = parseNumbersFromLine(lines[1]);
    //console.log("times: " + times)
    //console.log("distances: " + distances)
    var winningHoldTimesProduct = 1;
    for (var i = 0; i < times.length && i < distances.length; ++i) {
        var raceTime = times[i];
        var recordDistance = distances[i];
        var winningHoldTimes = [];
        for (var holdTime = 0; holdTime <= raceTime; holdTime++) {
            var travelTime = raceTime - holdTime;
            var distanceReached = holdTime * travelTime;
            if (distanceReached > recordDistance)
                winningHoldTimes.push(holdTime);
        }
        //console.log("Race " + i + " - Winning hold times: " + winningHoldTimes.length + " - [" + winningHoldTimes + "]")
        winningHoldTimesProduct *= winningHoldTimes.length;
    }
    console.log("Winning Hold Times Product: " + winningHoldTimesProduct);
}
exports.run06A = run06A;
function parseNumbersFromLine(line) {
    var regexMatch = line.match(/\d+/g);
    if (regexMatch == null)
        return [];
    var numbers = [];
    regexMatch.forEach(match => { numbers.push(+match); });
    return numbers;
}
function run06B() {
    console.log('Running 06B');
}
exports.run06B = run06B;
