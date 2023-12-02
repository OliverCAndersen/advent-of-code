"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run01A = void 0;
const fs_1 = require("fs");
function run01A() {
    console.log('Running 01');
    const fileContent = (0, fs_1.readFileSync)('./input/01/input.txt', 'utf-8');
    var sum = 0;
    fileContent.split(/\r?\n/).forEach(line => {
        var regexMatch = line.match(/\d+/g);
        if (regexMatch != null) {
            var firstGroup = regexMatch[0];
            var first = firstGroup[0];
            var last = "";
            if (regexMatch.length > 1) {
                var lastGroup = regexMatch[regexMatch.length - 1];
                last = lastGroup[lastGroup.length - 1];
            }
            else {
                last = firstGroup[firstGroup.length - 1];
            }
            var allGroups = "";
            for (var group of regexMatch) {
                allGroups += group;
            }
            var firstAndLast = first + last;
            //console.log(line + " => " + allGroups + " => " + first + " + " + last + " = " + firstAndLast + " regexMatch length: " + regexMatch.length)
            sum += +firstAndLast;
        }
    });
    console.log("Sum: " + sum);
}
exports.run01A = run01A;
