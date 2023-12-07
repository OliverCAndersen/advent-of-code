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

    console.log("Winning Hold Times Product: " + winningHoldTimesProduct)
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

export function run06B() : void
{
    console.log('Running 06B')
}