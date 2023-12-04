import { readFileSync } from 'fs';

export function run04A() : void
{
    console.log('Running 04A')

    const fileContent = readFileSync('./input/04/input.txt', 'utf-8')
    
    var sum : number = 0
    fileContent.split(/\r?\n/).forEach(line =>  {
        var lineWithoutCardId = line.split(":")[1]
        var winningAndMyNumbersStrings:string[] = lineWithoutCardId.split("|")
        var winningNumbersString: string = winningAndMyNumbersStrings[0]
        var myNumbersString: string = winningAndMyNumbersStrings[1]

        var winningNumbersRegexMatch : RegExpMatchArray | null = winningNumbersString.match(/\d+/g)
        if (winningNumbersRegexMatch == null)
            return
        
        var winningNumbers = new Array<number>()
        winningNumbersRegexMatch.forEach(numberString => winningNumbers.push(+numberString))

        var myNumbersRegexMatch : RegExpMatchArray | null = myNumbersString.match(/\d+/g)
        if (myNumbersRegexMatch == null)
            return
        
        var myNumbers = new Array<number>()
        myNumbersRegexMatch.forEach(numberString => myNumbers.push(+numberString))

        var intersectingNumbers = myNumbers.filter(num => winningNumbers.includes(num))

        //console.log(line + " => " + "     =>     W[" + winningNumbers + "] My[" + myNumbers + "] => " + intersectingNumbers)

        if (intersectingNumbers.length == 0)
            return

        // 1 score for the first card
        var cardScore: number = 1

        // then double the score with each extra match after that
        if (intersectingNumbers.length > 1)
            cardScore = Math.pow(2, intersectingNumbers.length - 1)

        //console.log("Game has " + intersectingNumbers.length + " winning numbers. Adding Card Score: " + cardScore + " Winning numbers: " + intersectingNumbers)
        
        sum += cardScore
    })

    console.log("Winning cards score sum: " + sum)
}

export function run04B() : void
{
    console.log('Running 04B')
    
}