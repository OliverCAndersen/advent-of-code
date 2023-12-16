"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run08B = exports.run08A = void 0;
const fs_1 = require("fs");
function run08A() {
    console.log('Running 08A');
    const fileContent = (0, fs_1.readFileSync)('./input/08/input.txt', 'utf-8');
    var lines = fileContent.split(/\r?\n/);
    var instructions = lines[0].trim();
    var nodes = {};
    // The nodes start at the 3rd row
    for (var i = 2; i < lines.length; ++i) {
        var line = lines[i];
        // The name is the 3 first letters
        var nodeName = line.substring(0, 3);
        var left = line.substring(7, 10);
        var right = line.substring(12, 15);
        nodes[nodeName] = [left, right];
        //console.log(line + " = > " + nodeName + " _ " + left + " | " + right)
    }
    //console.log(nodes)
    var steps = 0;
    var instructionIndex = 0;
    var currentNodeName = "AAA";
    while (currentNodeName != "ZZZ") {
        var instruction = instructions[instructionIndex];
        instructionIndex++;
        if (instructionIndex >= instructions.length)
            instructionIndex = 0;
        if (instruction == "L")
            currentNodeName = nodes[currentNodeName][0];
        else
            currentNodeName = nodes[currentNodeName][1];
        steps++;
    }
    console.log("Steps: " + steps);
}
exports.run08A = run08A;
function run08B() {
    console.log('Running 08B');
    const fileContent = (0, fs_1.readFileSync)('./input/08/input.txt', 'utf-8');
}
exports.run08B = run08B;
function parseNumbersFromLine(line) {
    var regexMatch = line.match(/\d+/g);
    if (regexMatch == null)
        return [];
    var numbers = [];
    regexMatch.forEach(match => { numbers.push(+match); });
    return numbers;
}
