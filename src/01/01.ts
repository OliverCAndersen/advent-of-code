import { readFileSync } from 'fs';

export function run01A() : void
{
    console.log('Running 01')

    const fileContent = readFileSync('./input/01/input.txt', 'utf-8')

    var sum : number = 0
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