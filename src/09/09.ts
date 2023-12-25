import { readFileSync } from 'fs';

export function run09A()
{
    console.log('Running 09A')

    const fileContent = readFileSync('./input/09/input.txt', 'utf-8')
    
    var sum: number = 0

    var lines: string[] = fileContent.trim().split(/\r?\n/)
    for (var line of lines)
    {
        //console.log("Line: " + line)
        var history: number[] = parseNumbersFromLine(line)
        var prediction: number = predictFutureFromHistory(history)
        //console.log(history + " -> " + prediction)
        sum += prediction
    }

    console.log("Prediction Sum: " + sum)
}

export function run09B()
{

}

function getHistoryBreakdownTree(history: number[]): number[][]
{
    var breakdownTree: number[][] = []
    breakdownTree.push(history)

    while (true)
    {
        // Get the differences from the last iteration
        var differences: number[] = getDifferencesFromSequence(breakdownTree[breakdownTree.length - 1])
        breakdownTree.push(differences)

        //console.log("Differences: " + differences)

        if (differences.every(num => num == 0))
            break
    }

    return breakdownTree
}

function predictFutureFromHistory(history: number[]): number
{
    var differenceBreakdownTree: number[][] = getHistoryBreakdownTree(history)

    //console.log(differenceBreakdownTree)

    var prediction = 0

    for (var i = differenceBreakdownTree.length - 2; i >= 0; --i)
    {
        var differences = differenceBreakdownTree[i]
        prediction = differences[differences.length - 1] + prediction
    }

    return prediction
}

function getDifferencesFromSequence(history: number[]): number[]
{
    var differences: number[] = []
    for (var i = 1; i < history.length; ++i)
    {
        differences.push(history[i] - history[i - 1])
    }
    return differences
}

function parseNumbersFromLine(line: string): number[]
{
    var regexMatch: RegExpMatchArray | null = line.match(/-?\d+/g)
    if (regexMatch == null)
        return []

    var numbers: number[] = []
    regexMatch.forEach(match => { numbers.push(+match) })
    return numbers
}