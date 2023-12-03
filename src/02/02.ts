import { readFileSync } from 'fs';

export function run02A() : void
{
    console.log('Running 02A')

    var bagColorAmounts : RGBColorAmounts = [12, 13, 14]

    console.log("Bag Contains (RGB): " + bagColorAmounts)

    const fileContent = readFileSync('./input/02/input.txt', 'utf-8')
    
    var sum : number = 0
    fileContent.split(/\r?\n/).forEach(line =>  {
        var gameIdRegexMatch : RegExpMatchArray | null = line.match(/\d+/)
        if (gameIdRegexMatch == null)
            return

        var gameId: number = +gameIdRegexMatch[0]

        var gameHands: Array<RGBColorAmounts> = parseToColorAmounts(line)
        var allHandsAreWithinLimits: boolean = gameHands.every(handAmount => { return handAmount[0] <= bagColorAmounts[0] && handAmount[1] <= bagColorAmounts[1] && handAmount[2] <= bagColorAmounts[2] })
        
        if (allHandsAreWithinLimits)
            sum += gameId

        //console.log("Hand: " + handColorAmounts + " | BagLimits: " + bagColorAmounts)

        console.log("GameId: " + gameId + (allHandsAreWithinLimits ? " - Possible" : " - Not Possible") + " | Hands: " + gameHands)
    })

    console.log("Possible game ID sum: " + sum)
}

export function run02B() : void
{
    console.log('Running 02B')

    
    const fileContent = readFileSync('./input/02/input.txt', 'utf-8')
    
    
    var sum : number = 0
    fileContent.split(/\r?\n/).forEach(line => {
        var gameIdRegexMatch : RegExpMatchArray | null = line.match(/\d+/)
        if (gameIdRegexMatch == null)
            return
    
        var gameId: number = +gameIdRegexMatch[0]

        var highestGameColorAmounts : RGBColorAmounts = [0, 0, 0]
        
        var gameHands: Array<RGBColorAmounts> = parseToColorAmounts(line)
        gameHands.forEach(handColorAmounts => {
            highestGameColorAmounts[0] = Math.max(handColorAmounts[0], highestGameColorAmounts[0])
            highestGameColorAmounts[1] = Math.max(handColorAmounts[1], highestGameColorAmounts[1])
            highestGameColorAmounts[2] = Math.max(handColorAmounts[2], highestGameColorAmounts[2])
        })

        var cubePower: number = highestGameColorAmounts[0] * highestGameColorAmounts[1] * highestGameColorAmounts[2]

        console.log("GameID " + gameId + " => Highest color amounts: " + highestGameColorAmounts + " => Power: " + cubePower)
        sum += cubePower
    })

    console.log("Sum of all games' Cube Power: " + sum)
}

type RGBColorAmounts = [red: number, green: number, blue: number]

function parseToColorAmounts(gameString: string) : Array<RGBColorAmounts>
{
    var allHandAmounts = new Array<RGBColorAmounts>()

    // Remove the "Game ID" part of the string
    var gameStringWithoutID: string = gameString.substring(gameString.indexOf(":") + 1)

    // remove whitespaces and split into an array of hands in the game
    var handStrings: string[] = gameStringWithoutID.replace(/\s/g, "").split(";")

    // parse each hand
    handStrings.forEach(hand => {
        var handAmounts: RGBColorAmounts = [0, 0, 0]

        // parse each color in the hand
        hand.split(",").forEach(colorString => {
            var amountRegExMatch: RegExpMatchArray | null = colorString.match(/\d+/)
            var amount = amountRegExMatch != null ? +amountRegExMatch[0] : 0;
            
            var colorName: string = ""

            if (colorString.includes("red"))
            {
                handAmounts[0] = amount
                colorName = "red"
            }
            else if (colorString.includes("green"))
            {
                handAmounts[1] = amount
                colorName = "green"
            }
            else if (colorString.includes("blue"))
            {
                handAmounts[2] = amount
                colorName = "blue"
            }

            //console.log(colorString + " => " + amount + " " + colorName)
        })

        allHandAmounts.push(handAmounts)
    })   

    return allHandAmounts;
}