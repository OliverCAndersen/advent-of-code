"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run03B = exports.run03A = void 0;
const fs_1 = require("fs");
function run03A() {
    var _a;
    console.log('Running 03A');
    const fileContent = (0, fs_1.readFileSync)('./input/03/input.txt', 'utf-8');
    var sum = 0;
    var lines = fileContent.split(/\r?\n/);
    var schematicsWidth = lines[0].length;
    var schematicsHeight = lines.length;
    const uniqueCharactersSet = new Set();
    // Find all possible special characters (all characters that are not digits or dots) and add them to the set
    for (var rowIndex = 0; rowIndex < schematicsHeight; ++rowIndex) {
        (_a = lines[rowIndex].match(/([^\d.])\1*/gi)) === null || _a === void 0 ? void 0 : _a.forEach(char => uniqueCharactersSet.add(char));
    }
    console.log("Unique Characters in game: " + Array.from(uniqueCharactersSet).join(''));
    var specialCharacterCoordinates = new Array();
    var digits = new Array();
    // Find coordinates of all digits and special characters
    for (var rowIndex = 0; rowIndex < schematicsHeight; ++rowIndex) {
        var line = lines[rowIndex];
        for (var charIndex = 0; charIndex < line.length; ++charIndex) {
            var character = line[charIndex];
            var isSpecialCharacter = uniqueCharactersSet.has(character);
            if (isSpecialCharacter) {
                // Save the x (charIndex) and y (rowIndex) of the special character
                specialCharacterCoordinates.push([charIndex, rowIndex]);
            }
            else {
                var digit = parseInt(line.substring(charIndex));
                if (!isNaN(digit)) {
                    var digitAsString = digit.toString();
                    // Save the digit together with the x (charIndex) and y (rowIndex) of the first character in the digit
                    digits.push([digitAsString, [charIndex, rowIndex]]);
                    // Consume all the indices of the number in case it is multi-digit, so we don't process the same again
                    charIndex += digitAsString.length - 1;
                }
            }
        }
    }
    console.log("Amount of Special character on schematics: " + specialCharacterCoordinates.length);
    console.log("Amount of Digits on schematics: " + digits.length);
    //console.log("Special character coordinates: " + specialCharacterCoordinates)
    //console.log("Digit coordinates: " + digits)
    for (var currentDigit of digits) {
        var digitString = currentDigit[0];
        if (isPartId(currentDigit, specialCharacterCoordinates))
            sum += +digitString;
    }
    console.log("Engine part sum: " + sum);
}
exports.run03A = run03A;
function run03B() {
    console.log('Running 03B');
}
exports.run03B = run03B;
function isPartId(digit, specialCharacterCoordinates) {
    var digitString = digit[0];
    var firstCharCoords = digit[1];
    var xCoord = firstCharCoords[0];
    var yCoord = firstCharCoords[1];
    for (var charIndex = 0; charIndex < digitString.length; ++charIndex) {
        if (hasAdjacentSpecialCharacter([xCoord + charIndex, yCoord], specialCharacterCoordinates))
            return true;
    }
    return false;
}
function containsCoords(specialCharacterCoordinates, coords) {
    return specialCharacterCoordinates.some(specialCharacterCoords => { return specialCharacterCoords[0] == coords[0] && specialCharacterCoords[1] == coords[1]; });
}
function hasAdjacentSpecialCharacter(characterCoordinates, specialCharacterCoordinates) {
    var characterX = characterCoordinates[0];
    var characterY = characterCoordinates[1];
    // Look right and left
    if (containsCoords(specialCharacterCoordinates, [characterX + 1, characterY]))
        return true;
    if (containsCoords(specialCharacterCoordinates, [characterX - 1, characterY]))
        return true;
    // Look above and below
    if (containsCoords(specialCharacterCoordinates, [characterX, characterY + 1]))
        return true;
    if (containsCoords(specialCharacterCoordinates, [characterX, characterY - 1]))
        return true;
    // Look diagonally up to the left
    if (containsCoords(specialCharacterCoordinates, [characterX - 1, characterY + 1]))
        return true;
    // Look diagonally up to the right
    if (containsCoords(specialCharacterCoordinates, [characterX + 1, characterY + 1]))
        return true;
    // Look diagonally down to the left
    if (containsCoords(specialCharacterCoordinates, [characterX - 1, characterY - 1]))
        return true;
    // Look diagonally down to the right
    if (containsCoords(specialCharacterCoordinates, [characterX + 1, characterY - 1]))
        return true;
    return false;
}
