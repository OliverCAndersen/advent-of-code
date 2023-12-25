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
    var lines = fileContent.split(/\r?\n/);
    var instructions = [];
    var instructionsString = lines[0].trim();
    for (var i = 0; i < instructionsString.length; ++i) {
        if (instructionsString[i] == "L")
            instructions.push(0);
        else if (instructionsString[i] == "R")
            instructions.push(1);
    }
    var nodes = [];
    var nodeLeftRightIds = [];
    var startingNodeIds = [];
    var nodeIdsToReach = [];
    // The nodes start at the 3rd row
    for (var i = 2; i < lines.length; ++i) {
        var line = lines[i];
        if (line[0] == "#")
            continue;
        // The name is the 3 first letters
        var nodeName = line.substring(0, 3);
        var left = line.substring(7, 10);
        var right = line.substring(12, 15);
        nodes.push([nodeName, left, right]);
        var nodeIndex = nodes.length - 1;
        if (nodeName[2] == 'A')
            startingNodeIds.push(nodeIndex);
        else if (nodeName[2] == 'Z')
            nodeIdsToReach.push(nodeIndex);
    }
    for (var node of nodes) {
        var leftName = node[1];
        var rightName = node[2];
        // find the indices of the nodes whose name matches our left and right
        var leftId = nodes.findIndex(n => n[0] == leftName);
        var rightId = nodes.findIndex(n => n[0] == rightName);
        nodeLeftRightIds.push([leftId, rightId]);
    }
    console.log("Target Nodes:");
    for (var i = 0; i < nodeIdsToReach.length; ++i) {
        console.log("Node: [" + nodeIdsToReach[i] + "]: " + nodes[nodeIdsToReach[i]][0]);
    }
    var cycleLengths = [];
    console.log("Starting nodes to reach target nodes:");
    for (var startingNodeId of startingNodeIds) {
        var currentStartingNodeIds = [];
        currentStartingNodeIds.push(startingNodeId);
        var steps = getStepsUntilAtTarget(instructions, nodes, nodeLeftRightIds, currentStartingNodeIds, nodeIdsToReach, 2);
        var stepsUntilFirstWin = steps[0];
        var cycleLength = steps[1] - stepsUntilFirstWin;
        cycleLengths.push(cycleLength);
        console.log("Node: [" + startingNodeId + "]: " + nodes[startingNodeId][0] + " | steps until first win: " + stepsUntilFirstWin + " | cycle repeat length: " + cycleLength);
    }
    console.log("Cycle Lengths: " + cycleLengths);
    var lcm = findLowestCommonMultiplier(cycleLengths);
    console.log("LCM: " + lcm);
}
exports.run08B = run08B;
function getStepsUntilAtTarget(instructions, nodes, nodeLeftRightIds, startingNodeIds, nodeIdsToReach, numberOfWinsToFind) {
    var nodeIdsToProcess = startingNodeIds;
    var allWinSteps = [];
    var instructionIndex = 0;
    var steps = 0;
    // Continue until all nodes are on a node ending on Z
    while (true) {
        steps++;
        var currentInstruction = instructions[instructionIndex];
        instructionIndex++;
        if (instructionIndex >= instructions.length)
            instructionIndex = 0;
        //console.log("Step " + steps + " - " + (currentInstruction == 0 ? "Left" : "Right"))
        var hasAllReachedATarget = true;
        for (var i = 0; i < nodeIdsToProcess.length; ++i) {
            nodeIdsToProcess[i] = nodeLeftRightIds[nodeIdsToProcess[i]][currentInstruction];
            if (hasAllReachedATarget && !nodeIdsToReach.includes(nodeIdsToProcess[i]))
                hasAllReachedATarget = false;
        }
        if (hasAllReachedATarget) {
            allWinSteps.push(steps);
            if (allWinSteps.length == numberOfWinsToFind)
                break;
        }
    }
    return allWinSteps;
}
function findLowestCommonMultiplier(numbers) {
    var lcm = numbers[0];
    for (var num of numbers)
        lcm = (num * lcm) / greatestCommonDivisor(num, lcm);
    return lcm;
}
function greatestCommonDivisor(a, b) {
    if (b == 0)
        return a;
    return greatestCommonDivisor(b, a % b);
}
