"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run09B = exports.run09A = void 0;
const fs_1 = require("fs");
function run09A() {
    console.log('Running 09A');
    const fileContent = (0, fs_1.readFileSync)('./input/09/input.txt', 'utf-8');
    var sum = 0;
    var lines = fileContent.trim().split(/\r?\n/);
    for (var line of lines) {
        //console.log("Line: " + line)
        var history = parseNumbersFromLine(line);
        var prediction = predictFutureFromHistory(history);
        //console.log(history + " -> " + prediction)
        sum += prediction;
    }
    console.log("Prediction Sum: " + sum);
}
exports.run09A = run09A;
function run09B() {
    console.log('Running 09B');
    const fileContent = (0, fs_1.readFileSync)('./input/09/input.txt', 'utf-8');
    var sum = 0;
    var lines = fileContent.trim().split(/\r?\n/);
    for (var line of lines) {
        //console.log("Line: " + line)
        var history = parseNumbersFromLine(line);
        var prediction = predictPastFromHistory(history);
        //console.log(history + " -> " + prediction)
        sum += prediction;
    }
    console.log("Prediction Sum: " + sum);
}
exports.run09B = run09B;
function getHistoryBreakdownTree(history) {
    var breakdownTree = [];
    breakdownTree.push(history);
    while (true) {
        // Get the differences from the last iteration
        var differences = getDifferencesFromSequence(breakdownTree[breakdownTree.length - 1]);
        breakdownTree.push(differences);
        //console.log("Differences: " + differences)
        if (differences.every(num => num == 0))
            break;
    }
    return breakdownTree;
}
function predictFutureFromHistory(history) {
    var differenceBreakdownTree = getHistoryBreakdownTree(history);
    //console.log(differenceBreakdownTree)
    var prediction = 0;
    // Go from the bottom up in the tree and transform the prediction at the end of the history
    for (var i = differenceBreakdownTree.length - 2; i >= 0; --i) {
        var differences = differenceBreakdownTree[i];
        prediction = differences[differences.length - 1] + prediction;
    }
    return prediction;
}
function predictPastFromHistory(history) {
    var differenceBreakdownTree = getHistoryBreakdownTree(history);
    //console.log(differenceBreakdownTree)
    var prediction = 0;
    // Go from the bottom up in the tree and transform the prediction at the front of the history
    for (var i = differenceBreakdownTree.length - 2; i >= 0; --i) {
        var differences = differenceBreakdownTree[i];
        prediction = differences[0] - prediction;
    }
    return prediction;
}
function getDifferencesFromSequence(history) {
    var differences = [];
    for (var i = 1; i < history.length; ++i) {
        differences.push(history[i] - history[i - 1]);
    }
    return differences;
}
function parseNumbersFromLine(line) {
    var regexMatch = line.match(/-?\d+/g);
    if (regexMatch == null)
        return [];
    var numbers = [];
    regexMatch.forEach(match => { numbers.push(+match); });
    return numbers;
}
