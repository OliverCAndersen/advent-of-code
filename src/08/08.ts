import { readFileSync } from 'fs';

export function run08A() : void
{
    console.log('Running 08A')

    const fileContent = readFileSync('./input/08/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var instructions: string = lines[0].trim()

    var nodes: {[name: string]: [left: string, right: string]} = {}

    // The nodes start at the 3rd row
    for (var i = 2; i < lines.length; ++i)
    {
        var line: string = lines[i]
        // The name is the 3 first letters
        var nodeName: string = line.substring(0, 3)

        var left: string = line.substring(7, 10)
        var right: string = line.substring(12, 15)

        nodes[nodeName] = [left, right]

        //console.log(line + " = > " + nodeName + " _ " + left + " | " + right)
    }

    //console.log(nodes)

    var steps: number = 0
    var instructionIndex: number = 0
    var currentNodeName: string = "AAA"
    while(currentNodeName != "ZZZ")
    {
        var instruction: string = instructions[instructionIndex]
        instructionIndex++
        if (instructionIndex >= instructions.length)
            instructionIndex = 0

        if (instruction == "L")
            currentNodeName = nodes[currentNodeName][0]
        else
            currentNodeName = nodes[currentNodeName][1]

        steps++
    }

    console.log("Steps: " + steps)
}

export function run08B() : void
{
    console.log('Running 08B')

    const fileContent = readFileSync('./input/08/input.txt', 'utf-8')


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
