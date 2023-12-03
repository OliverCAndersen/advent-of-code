import { readFileSync } from 'fs';

export function run01A() : void
{
    console.log('Running 01A')

    const fileContent = readFileSync('./input/01/input.txt', 'utf-8')

    var sum : number = 0
    // Split each line in the file and then find the numbers of each
    fileContent.split(/\r?\n/).forEach(line =>  {
        var regexMatch : RegExpMatchArray | null = line.match(/\d+/g)
        if (regexMatch != null)
        {
            var firstGroup = regexMatch[0];
            var first : string = firstGroup[0]
            var last : string = ""
            if (regexMatch.length > 1)
            {
                var lastGroup : string = regexMatch[regexMatch.length - 1]
                last = lastGroup[lastGroup.length - 1]
            }
            else
            {
                last = firstGroup[firstGroup.length - 1]
            }

            var allGroups : string = ""
            for (var group of regexMatch)
            {
                allGroups += group;
            }
           
            var firstAndLast : string = first + last;
            //console.log(line + " => " + allGroups + " => " + first + " + " + last + " = " + firstAndLast + " regexMatch length: " + regexMatch.length)
            sum += +firstAndLast
        }
      });

    console.log("Sum: " + sum)
}

function tryReadText(line : string, firstIndex : number, textToLookFor : string) : boolean
{
    return line.substring(firstIndex, firstIndex + textToLookFor.length) == textToLookFor;
}

export function run01B() : void
{
    console.log('Running 01B')

    const fileContent = readFileSync('./input/01/input.txt', 'utf-8')

    var sum : number = 0
    // Split each line in the file and then find the numbers of each
    fileContent.split(/\r?\n/).forEach(line =>  {
        var allNumbers = new Array()
        for (var charIndex : number = 0; charIndex < line.length; ++charIndex)
        {
            var leadingCharacter : string = line[charIndex]
            if (isNaN(Number(leadingCharacter)))
            {
                // not digits, check for text forming numbers
                // if a match is found, consume all the letters and move the index to the last one
                if (tryReadText(line, charIndex, "one"))
                    allNumbers.push("1")
                else if (tryReadText(line, charIndex, "two"))
                    allNumbers.push("2")
                else if (tryReadText(line, charIndex, "three"))
                    allNumbers.push("3")
                else if (tryReadText(line, charIndex, "four"))
                    allNumbers.push("4")
                else if (tryReadText(line, charIndex, "five"))
                    allNumbers.push("5")
                else if (tryReadText(line, charIndex, "six"))
                    allNumbers.push("6")
                else if (tryReadText(line, charIndex, "seven"))
                    allNumbers.push("7")
                else if (tryReadText(line, charIndex, "eight"))
                    allNumbers.push("8")
                else if (tryReadText(line, charIndex, "nine"))
                    allNumbers.push("9")
            }
            else
            {
                allNumbers.push(leadingCharacter)
            }
        }

        if (allNumbers.length == 0)
            return

        var first : string = allNumbers[0]
        var last : string = allNumbers[allNumbers.length - 1]
        
        var firstAndLast : string = first + last
        //console.log(line + " => " + allNumbers + " => " + first + " + " + last + " = " + firstAndLast)
        sum += +firstAndLast
      })

    console.log("Sum: " + sum)
}