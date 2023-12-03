import { readFileSync } from 'fs';

type Coordinates = [x: number, y: number]
type Digit = [numberString: string, firstCharCoords: Coordinates]

export function run03A() : void
{
    console.log('Running 03A')

    const fileContent = readFileSync('./input/03/input.txt', 'utf-8')
    
    var sum : number = 0
    var lines: string[] = fileContent.split(/\r?\n/)
    var schematicsWidth: number = lines[0].length
    var schematicsHeight: number = lines.length

    const uniqueCharactersSet = new Set<string>()

    // Find all possible special characters (all characters that are not digits or dots) and add them to the set
    for (var rowIndex = 0; rowIndex < schematicsHeight; ++rowIndex)
    {
        lines[rowIndex].match(/([^\d.])\1*/gi)?.forEach(char => uniqueCharactersSet.add(char));
    }

    console.log("Unique Characters in game: " + Array.from(uniqueCharactersSet).join(''))

    var specialCharacterCoordinates = new Array<Coordinates>()
    var digits = new Array<Digit>()  

    // Find coordinates of all digits and special characters
    for (var rowIndex = 0; rowIndex < schematicsHeight; ++rowIndex)
    {
        var line: string = lines[rowIndex]
        for (var charIndex = 0; charIndex < line.length; ++charIndex)
        {
            var character: string = line[charIndex]
            var isSpecialCharacter: boolean = uniqueCharactersSet.has(character)
            if (isSpecialCharacter)
            {
                // Save the x (charIndex) and y (rowIndex) of the special character
                specialCharacterCoordinates.push([charIndex, rowIndex])
            }
            else
            {
                var digit: number = parseInt(line.substring(charIndex))
                if (!isNaN(digit))
                {
                    var digitAsString: string = digit.toString()

                    // Save the digit together with the x (charIndex) and y (rowIndex) of the first character in the digit
                    digits.push([digitAsString, [charIndex, rowIndex]])

                    // Consume all the indices of the number in case it is multi-digit, so we don't process the same again
                    charIndex += digitAsString.length - 1
                }
            }
        }
    }

    console.log("Amount of Special character on schematics: " + specialCharacterCoordinates.length)
    console.log("Amount of Digits on schematics: " + digits.length)

    //console.log("Special character coordinates: " + specialCharacterCoordinates)
    //console.log("Digit coordinates: " + digits)

    for (var currentDigit of digits)
    {
        var digitString: string = currentDigit[0]
        if (isPartId(currentDigit, specialCharacterCoordinates))
            sum += +digitString
    }

    console.log("Engine part sum: " + sum)
}

export function run03B() : void
{
    console.log('Running 03B')
}

function isPartId(digit: Digit, specialCharacterCoordinates: Array<Coordinates>): boolean
{
    var digitString: string = digit[0]
    var firstCharCoords: Coordinates = digit[1]
    var xCoord = firstCharCoords[0]
    var yCoord = firstCharCoords[1];

    for (var charIndex = 0; charIndex < digitString.length; ++charIndex)
    {
        if (hasAdjacentSpecialCharacter([xCoord + charIndex, yCoord], specialCharacterCoordinates))
            return true
    }

    return false
}

function containsCoords(specialCharacterCoordinates: Array<Coordinates>, coords: Coordinates): boolean
{
    return specialCharacterCoordinates.some(specialCharacterCoords => { return specialCharacterCoords[0] == coords[0] && specialCharacterCoords[1] == coords[1] })
}

function hasAdjacentSpecialCharacter(characterCoordinates: Coordinates, specialCharacterCoordinates: Array<Coordinates>): boolean
{
    var characterX: number = characterCoordinates[0]
    var characterY: number = characterCoordinates[1]

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