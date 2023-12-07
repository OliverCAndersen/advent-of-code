import { readFileSync } from 'fs';

export function run06A() : void
{
    console.log('Running 06A')

    const fileContent = readFileSync('./input/06/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var times: number[] = parseNumbersFromLine(lines[0])
    var distances: number[] = parseNumbersFromLine(lines[1])

    //console.log("times: " + times)
    //console.log("distances: " + distances)

    var winningHoldTimesProduct = getWinningHoldTimesProduct(times, distances)  

    console.log("Winning Hold Times Product: " + winningHoldTimesProduct)
}

function getWinningHoldTimesProduct(times: number[], distances: number[]): number
{
    var winningHoldTimesProduct = 1

    for (var i = 0; i < times.length && i < distances.length; ++i)
    {
        var raceTime: number = times[i]
        var recordDistance: number = distances[i]

        var winningHoldTimes: number[] = []

        for (var holdTime = 0; holdTime <= raceTime; holdTime++)
        {
            var travelTime = raceTime - holdTime
            var distanceReached =  holdTime * travelTime

            if (distanceReached > recordDistance)
                winningHoldTimes.push(holdTime)
        }

        //console.log("Race " + i + " - Winning hold times: " + winningHoldTimes.length + " - [" + winningHoldTimes + "]")

        winningHoldTimesProduct *= winningHoldTimes.length
    }
    
    return winningHoldTimesProduct
}

function parseNumbersFromLine(line: string): number[]
{
    var regexMatch: RegExpMatchArray | null = line.match(/\d+/g)
    if (regexMatch == null)
        return []

    var numbers: number[] = []
    regexMatch.forEach(match => { numbers.push(+match) })
    return numbers
}

function parseNumberFromLineIgnoreSpaces(line: string): number
{
    var regexMatch: RegExpMatchArray | null = line.match(/\d+/g)
    if (regexMatch == null)
        return 0

    var numberString = ""
    regexMatch.forEach(match => { numberString += match })
    return +numberString
}

export function run06B() : void
{
    console.log('Running 06B')

    const fileContent = readFileSync('./input/06/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var times: number[] = [parseNumberFromLineIgnoreSpaces(lines[0])]
    var distances: number[] = [parseNumberFromLineIgnoreSpaces(lines[1])]

    //console.log("times: " + times)
    //console.log("distances: " + distances)

    var winningHoldTimesProduct = getWinningHoldTimesProduct(times, distances)  

    console.log("Winning Hold Times Product: " + winningHoldTimesProduct)
}