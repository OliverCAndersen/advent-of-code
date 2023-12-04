import { readFileSync } from 'fs';

type Coordinates = [x: number, y: number]
type SpecialCharacter = [characterString: string, coords: Coordinates]
type Digit = [numberString: string, firstCharCoords: Coordinates]

export function run03A() : void
{
    console.log('Running 03A')
    
    var sum : number = 0
    
    var specialCharacters: Array<SpecialCharacter>
    var digits: Array<Digit>

    [digits, specialCharacters] = getDigitAndSpecialCharacters()

    for (var currentDigit of digits)
    {
        var digitString: string = currentDigit[0]
        if (isPartId(currentDigit, specialCharacters))
            sum += +digitString
    }

    console.log("Engine part sum: " + sum)
}

export function run03B() : void
{
    console.log('Running 03B')
    
    var sum : number = 0
    
    var specialCharacters: Array<SpecialCharacter>
    var digits: Array<Digit>

    [digits, specialCharacters] = getDigitAndSpecialCharacters()

    for (var specialCharacter of specialCharacters)
    {
        var specialCharacterString: string = specialCharacter[0]
        if (specialCharacterString != "*")
            continue

        sum += getGearRatio(specialCharacter, digits)
    }

    console.log("Engine part sum: " + sum)
}

function getDigitAndSpecialCharacters() : [Array<Digit>, Array<SpecialCharacter>]
{
    const fileContent = readFileSync('./input/03/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)
    var schematicsHeight: number = lines.length

    const uniqueCharactersSet = new Set<string>()

    // Find all possible special characters (all characters that are not digits or dots) and add them to the set
    for (var rowIndex = 0; rowIndex < schematicsHeight; ++rowIndex)
    {
        lines[rowIndex].match(/([^\d.])\1*/gi)?.forEach(char => uniqueCharactersSet.add(char));
    }

    console.log("Unique Characters in game: " + Array.from(uniqueCharactersSet).join(''))

    var specialCharacters = new Array<SpecialCharacter>()
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
                // Save the character together with its x (charIndex) and y (rowIndex)
                specialCharacters.push([character, [charIndex, rowIndex]])
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

    console.log("Amount of Special character on schematics: " + specialCharacters.length)
    console.log("Amount of Digits on schematics: " + digits.length)

    return [digits, specialCharacters]
}

function getGearRatio(specialCharacter: SpecialCharacter, digits: Array<Digit>): number
{
    var adjacentDigits = new Array<number>

    var specialCharacterAsArray = new Array<SpecialCharacter>()
    specialCharacterAsArray.push(specialCharacter)

    // Hijack the isPartID method testing against only our single special character to know how many digits are adjacent to it
    for (var currentDigit of digits)
    {
        var digitString: string = currentDigit[0]
        if (isPartId(currentDigit, specialCharacterAsArray))
            adjacentDigits.push(+digitString)
    }

    // Gears have exactly 2 adjacent digits
    if (adjacentDigits.length != 2)
        return 0

    var gearRatio:number = adjacentDigits[0] * adjacentDigits[1]

    //console.log(specialCharacter + " is a gear with ratio :" + gearRatio + " from numbers " + adjacentDigits)

    return gearRatio
}

function isPartId(digit: Digit, specialCharacters: Array<SpecialCharacter>): boolean
{
    var digitString: string = digit[0]
    var firstCharCoords: Coordinates = digit[1]
    var xCoord = firstCharCoords[0]
    var yCoord = firstCharCoords[1];

    for (var charIndex = 0; charIndex < digitString.length; ++charIndex)
    {
        if (hasAdjacentSpecialCharacter([xCoord + charIndex, yCoord], specialCharacters))
            return true
    }

    return false
}

function containsCoords(specialCharacters: Array<SpecialCharacter>, coords: Coordinates): boolean
{
    return specialCharacters.some(specialCharacterCoords => { return specialCharacterCoords[1][0] == coords[0] && specialCharacterCoords[1][1] == coords[1] })
}

function hasAdjacentSpecialCharacter(characterCoordinates: Coordinates, specialCharacters: Array<SpecialCharacter>): boolean
{
    var characterX: number = characterCoordinates[0]
    var characterY: number = characterCoordinates[1]

    // Look right and left
    if (containsCoords(specialCharacters, [characterX + 1, characterY]))
        return true;
    if (containsCoords(specialCharacters, [characterX - 1, characterY]))
        return true;

    // Look above and below
    if (containsCoords(specialCharacters, [characterX, characterY + 1]))
        return true;
    if (containsCoords(specialCharacters, [characterX, characterY - 1]))
        return true;

    // Look diagonally up to the left
    if (containsCoords(specialCharacters, [characterX - 1, characterY + 1]))
    	return true;

    // Look diagonally up to the right
    if (containsCoords(specialCharacters, [characterX + 1, characterY + 1]))
        return true;

    // Look diagonally down to the left
    if (containsCoords(specialCharacters, [characterX - 1, characterY - 1]))
    	return true;

    // Look diagonally down to the right
    if (containsCoords(specialCharacters, [characterX + 1, characterY - 1]))
        return true;
    
    return false;
}