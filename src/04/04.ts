import { readFileSync } from 'fs';

export function run04A() : void
{
    console.log('Running 04A')

    const fileContent = readFileSync('./input/04/input.txt', 'utf-8')
    
    var sum : number = 0
    fileContent.split(/\r?\n/).forEach(line =>  {
        var matchingNumbers: number[] = getMatchingNumbersOnCard(line)

        if (matchingNumbers.length == 0)
            return

        // 1 score for the first card
        var cardScore: number = 1

        // then double the score with each extra match after that
        if (matchingNumbers.length > 1)
            cardScore = Math.pow(2, matchingNumbers.length - 1)

        //console.log("Game has " + matchingNumbers.length + " winning numbers. Adding Card Score: " + cardScore + " Winning numbers: " + matchingNumbers)
        
        sum += cardScore
    })

    console.log("Winning cards score sum: " + sum)
}

export function run04B() : void
{
    console.log('Running 04B')

    const fileContent = readFileSync('./input/04/input.txt', 'utf-8')

    var cardScoresAndCount = new Array<[number, number]>
    fileContent.split(/\r?\n/).forEach(line =>  {
        var matchingNumbers: number[] = getMatchingNumbersOnCard(line)

        //console.log("Game has " + matchingNumbers.length + " winning numbers. Winning numbers: " + matchingNumbers)
        
        cardScoresAndCount.push([matchingNumbers.length, 1])
    })

    var sum : number = 0

    // Reward clones for all winning cards 
    for (var i = 0; i < cardScoresAndCount.length; ++i)
    {
        // clone the following (cardScore) amount of cards (cardCount) times
        var cardScore: number = cardScoresAndCount[i][0]
        var cardCount: number = cardScoresAndCount[i][1]
        for (var scoreIteration = 1; scoreIteration <= cardScore; ++scoreIteration)
        {
            cardScoresAndCount[i + scoreIteration][1] += 1 * cardCount
        }

        sum += cardCount
    }

    console.log("Amount of cards at the end: " + sum)
}

function getMatchingNumbersOnCard(line: string): number[]
{
    var lineWithoutCardId = line.split(":")[1]
    var winningAndMyNumbersStrings:string[] = lineWithoutCardId.split("|")
    var winningNumbersString: string = winningAndMyNumbersStrings[0]
    var myNumbersString: string = winningAndMyNumbersStrings[1]

    var winningNumbersRegexMatch : RegExpMatchArray | null = winningNumbersString.match(/\d+/g)
    if (winningNumbersRegexMatch == null)
        return []
    
    var winningNumbers = new Array<number>()
    winningNumbersRegexMatch.forEach(numberString => winningNumbers.push(+numberString))

    var myNumbersRegexMatch : RegExpMatchArray | null = myNumbersString.match(/\d+/g)
    if (myNumbersRegexMatch == null)
        return []
    
    var myNumbers = new Array<number>()
    myNumbersRegexMatch.forEach(numberString => myNumbers.push(+numberString))

    var matchingNumbers: number[] = myNumbers.filter(num => winningNumbers.includes(num))

    //console.log(line + " => " + "     =>     W[" + winningNumbers + "] My[" + myNumbers + "] => " + matchingNumbers)

    return matchingNumbers
}
