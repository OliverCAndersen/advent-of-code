"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run10B = exports.run10A = void 0;
const console_1 = require("console");
const fs_1 = require("fs");
var CharacterType;
(function (CharacterType) {
    CharacterType["Ground"] = ".";
    CharacterType["NorthSouth"] = "|";
    CharacterType["EastWest"] = "-";
    CharacterType["NorthEast"] = "L";
    CharacterType["NorthWest"] = "J";
    CharacterType["SouthWest"] = "7";
    CharacterType["SouthEast"] = "F";
    CharacterType["StartingPosition"] = "S";
})(CharacterType || (CharacterType = {}));
class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function run10A() {
    console.log('Running 10A');
    const fileContent = (0, fs_1.readFileSync)('./input/10/input.txt', 'utf-8');
    var lines = fileContent.trim().split(/\r?\n/);
    // Find starting position    
    var startingPipe = { type: CharacterType.StartingPosition, coords: new Coordinates(0, 0) };
    for (var y = 0; y < lines.length; ++y) {
        var startingPositionX = lines[y].indexOf(CharacterType.StartingPosition);
        if (startingPositionX != -1) {
            startingPipe.coords.x = startingPositionX;
            startingPipe.coords.y = y;
            break;
        }
    }
    deduceStartingPipeTypeFromNeighbors(lines, startingPipe);
    console.log("Start Pipe: ");
    console.log(startingPipe);
    var mainLine = [];
    mainLine.push(startingPipe);
    if (startingPipe.nextPipe == null)
        throw console_1.error;
    var currentPipe = startingPipe.nextPipe;
    currentPipe.previousPipe = startingPipe;
    while (true) {
        if (currentPipe.previousPipe == null)
            throw console_1.error; // The last loop iteration should have set it up
        var deltaX = currentPipe.coords.x - currentPipe.previousPipe.coords.x;
        var deltaY = currentPipe.coords.y - currentPipe.previousPipe.coords.y;
        //console.log("Moving [x: " + deltaX + ", y: " + deltaY + "]")
        mainLine.push(currentPipe);
        switch (currentPipe.type) {
            // |
            case CharacterType.NorthSouth:
                {
                    // Vertical line, so continue in the same direction we were going from the previous pipe to prevent linking the previousPipe as the nextPipe
                    currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x, currentPipe.coords.y + deltaY);
                    break;
                }
            // -
            case CharacterType.EastWest:
                {
                    // Horizontal line, so continue in the same direction we were going from the previous pipe to prevent linking the previousPipe as the nextPipe
                    currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x + deltaX, currentPipe.coords.y);
                    break;
                }
            // L
            case CharacterType.NorthEast:
                {
                    // If we moved vertically, the next is to the east
                    if (deltaY != 0)
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x + 1, currentPipe.coords.y);
                    else // We must have moved horizontally, which means the next is to the north
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x, currentPipe.coords.y - 1);
                    break;
                }
            // J
            case CharacterType.NorthWest:
                {
                    // If we moved vertically, the next is to the west
                    if (deltaY != 0)
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x - 1, currentPipe.coords.y);
                    else // We must have moved horizontally, which means the next is to the north
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x, currentPipe.coords.y - 1);
                    break;
                }
            // 7
            case CharacterType.SouthWest:
                {
                    // If we moved vertically, the next is to the west
                    if (deltaY != 0)
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x - 1, currentPipe.coords.y);
                    else // We must have moved horizontally, which means the next is to the south
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x, currentPipe.coords.y + 1);
                    break;
                }
            // F
            case CharacterType.SouthEast:
                {
                    // If we moved vertically, the next is to the east
                    if (deltaY != 0)
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x + 1, currentPipe.coords.y);
                    else // We must have moved horizontally, which means the next is to the south
                        currentPipe.nextPipe = getCharacter(lines, currentPipe.coords.x, currentPipe.coords.y + 1);
                    break;
                }
        }
        if (currentPipe.nextPipe == null || currentPipe.nextPipe.type == CharacterType.Ground)
            throw console_1.error; // Failed to find the next pipe
        // Break if we find a pipe that was already setup to get out of loops in the network
        if (currentPipe.nextPipe.previousPipe != null)
            break;
        //console.log(currentPipe.type + " -> " + currentPipe.nextPipe.type)
        if (currentPipe.nextPipe.type == CharacterType.StartingPosition) {
            currentPipe.nextPipe = startingPipe;
            break;
        }
        // Connect the nextPipe back to the currentPipe so both know about the connection
        currentPipe.nextPipe.previousPipe = currentPipe;
        // Move on to the next pipe
        currentPipe = currentPipe.nextPipe;
    }
    console.log("Main line length: " + mainLine.length);
    var longestStepDistance = mainLine.length / 2;
    console.log("Longest step distance: " + longestStepDistance);
}
exports.run10A = run10A;
function run10B() {
    console.log('Running 10B');
    const fileContent = (0, fs_1.readFileSync)('./input/10/input.txt', 'utf-8');
    var sum = 0;
    var lines = fileContent.trim().split(/\r?\n/);
    for (var line of lines) {
    }
    console.log("Prediction Sum: " + sum);
}
exports.run10B = run10B;
function deduceStartingPipeTypeFromNeighbors(lines, startingCharacter) {
    var westCharacter = getCharacter(lines, startingCharacter.coords.x - 1, startingCharacter.coords.y);
    var eastCharacter = getCharacter(lines, startingCharacter.coords.x + 1, startingCharacter.coords.y);
    var northCharacter = getCharacter(lines, startingCharacter.coords.x, startingCharacter.coords.y - 1);
    var southCharacter = getCharacter(lines, startingCharacter.coords.x, startingCharacter.coords.y + 1);
    console.log("\t" + northCharacter.type);
    console.log(westCharacter.type + "\t" + startingCharacter.type + "\t" + eastCharacter.type);
    console.log("\t" + southCharacter.type);
    // _
    if (westCharacter.type != CharacterType.Ground && eastCharacter.type != CharacterType.Ground) {
        startingCharacter.type = CharacterType.EastWest;
        startingCharacter.previousPipe = westCharacter;
        startingCharacter.nextPipe = eastCharacter;
    }
    // J
    else if (westCharacter.type != CharacterType.Ground && northCharacter.type != CharacterType.Ground) {
        startingCharacter.type = CharacterType.NorthWest;
        startingCharacter.previousPipe = westCharacter;
        startingCharacter.nextPipe = northCharacter;
    }
    // 7
    else if (westCharacter.type != CharacterType.Ground && southCharacter.type != CharacterType.Ground) {
        startingCharacter.type = CharacterType.SouthWest;
        startingCharacter.previousPipe = westCharacter;
        startingCharacter.nextPipe = southCharacter;
    }
    // L
    else if (eastCharacter.type != CharacterType.Ground && northCharacter.type != CharacterType.Ground) {
        startingCharacter.type = CharacterType.NorthEast;
        startingCharacter.previousPipe = eastCharacter;
        startingCharacter.nextPipe = northCharacter;
    }
    // F
    else if (eastCharacter.type != CharacterType.Ground && southCharacter.type != CharacterType.Ground) {
        startingCharacter.type = CharacterType.SouthEast;
        startingCharacter.previousPipe = eastCharacter;
        startingCharacter.nextPipe = southCharacter;
    }
    // |
    else if (northCharacter.type != CharacterType.Ground && southCharacter.type != CharacterType.Ground) {
        startingCharacter.type = CharacterType.NorthSouth;
        startingCharacter.previousPipe = northCharacter;
        startingCharacter.nextPipe = southCharacter;
    }
}
function getCharacter(lines, x, y) {
    var character = { type: CharacterType.Ground, coords: new Coordinates(x, y) };
    // Just label it as ground if outside the map as those will be disregarded anyway
    if (y >= lines.length)
        return character;
    var line = lines[y];
    if (x >= line.length)
        return character;
    character.type = lines[y][x];
    return character;
}
