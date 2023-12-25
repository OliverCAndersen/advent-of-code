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

type Node = [name: string, left: string, right: string]

export function run08B() : void
{
    console.log('Running 08B')

    const fileContent = readFileSync('./input/08/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var instructions: number[] = []

    var instructionsString: string = lines[0].trim()
    for (var i = 0; i < instructionsString.length; ++i)
    {
        if (instructionsString[i] == "L")
            instructions.push(0)
        else if (instructionsString[i] == "R")
            instructions.push(1)
    }

    var nodes: Node[] = []
    var nodeLeftRightIds: [number, number][] = []
    var startingNodeIds: number[] = []
    var nodeIdsToReach: number[] = []

    // The nodes start at the 3rd row
    for (var i = 2; i < lines.length; ++i)
    {
        var line: string = lines[i]
        if (line[0] == "#")
            continue

        // The name is the 3 first letters
        var nodeName: string = line.substring(0, 3)

        var left: string = line.substring(7, 10)
        var right: string = line.substring(12, 15)

        nodes.push([nodeName, left, right])

        var nodeIndex: number = nodes.length - 1

        if (nodeName[2] == 'A')
            startingNodeIds.push(nodeIndex)
        else if (nodeName[2] == 'Z')
            nodeIdsToReach.push(nodeIndex)
    }

    for (var node of nodes)
    {
        var leftName: string = node[1]
        var rightName: string = node[2]

        // find the indices of the nodes whose name matches our left and right
        var leftId: number = nodes.findIndex(n => n[0] == leftName)
        var rightId: number = nodes.findIndex(n => n[0] == rightName)

        nodeLeftRightIds.push([leftId, rightId])
    }

    console.log("Target Nodes:")
    for (var i = 0; i < nodeIdsToReach.length; ++i)
    {
        console.log("Node: [" + nodeIdsToReach[i] + "]: " + nodes[nodeIdsToReach[i]][0])
    }

    var cycleLengths: number[] = []

    console.log("Starting nodes to reach target nodes:")
    for (var startingNodeId of startingNodeIds)
    {
        var currentStartingNodeIds: number[] = []
        currentStartingNodeIds.push(startingNodeId)
        var steps: number[] = getStepsUntilAtTarget(instructions, nodes, nodeLeftRightIds, currentStartingNodeIds, nodeIdsToReach, 2)

        var stepsUntilFirstWin: number = steps[0]
        var cycleLength: number = steps[1] - stepsUntilFirstWin
        cycleLengths.push(cycleLength)

        console.log("Node: [" + startingNodeId + "]: " + nodes[startingNodeId][0] + " | steps until first win: " + stepsUntilFirstWin + " | cycle repeat length: " + cycleLength)
    }

    console.log("Cycle Lengths: " + cycleLengths)

    var lcm = findLowestCommonMultiplier(cycleLengths)

    console.log("LCM: " + lcm)    
}

function getStepsUntilAtTarget(instructions: number[], nodes: Node[], nodeLeftRightIds: [number, number][], startingNodeIds: number[], nodeIdsToReach: number[], numberOfWinsToFind: number): number[]
{
    var nodeIdsToProcess: number[] = startingNodeIds

    var allWinSteps: number[] = []
    var instructionIndex: number = 0

    var steps: number = 0

    // Continue until all nodes are on a node ending on Z
    while(true)
    {
        steps++

        var currentInstruction = instructions[instructionIndex]

        instructionIndex++
        if (instructionIndex >= instructions.length)
            instructionIndex = 0

        //console.log("Step " + steps + " - " + (currentInstruction == 0 ? "Left" : "Right"))

        var hasAllReachedATarget: boolean = true

        for (var i = 0; i < nodeIdsToProcess.length; ++i)
        {
            nodeIdsToProcess[i] = nodeLeftRightIds[nodeIdsToProcess[i]][currentInstruction]

            if (hasAllReachedATarget && !nodeIdsToReach.includes(nodeIdsToProcess[i]))
                hasAllReachedATarget = false
        }

        if (hasAllReachedATarget)
        {
            allWinSteps.push(steps)

            if (allWinSteps.length == numberOfWinsToFind)
                break
        }
    }

    return allWinSteps
}

function findLowestCommonMultiplier(numbers: number[]): number
{
    var lcm = numbers[0]

    for (var num of numbers)
        lcm = (num * lcm) / greatestCommonDivisor(num, lcm)

    return lcm
}

function greatestCommonDivisor(a: number, b: number): number
{
    if (b == 0)
        return a
    return greatestCommonDivisor(b, a % b)
}

