"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run05B = exports.run05A = void 0;
const fs_1 = require("fs");
class Mapping {
    constructor(source, dest, count) {
        this.sourceRange = [source, source + count - 1];
        this.idModifier = dest - source;
    }
    isInRange(id) {
        return id >= this.sourceRange[0] && id <= this.sourceRange[1];
    }
    map(id) {
        // Out of range -> keep same id
        if (id < this.sourceRange[0] && id > this.sourceRange[1])
            return id;
        return id + this.idModifier;
    }
}
function run05A() {
    console.log('Running 05A');
    const fileContent = (0, fs_1.readFileSync)('./input/05/input.txt', 'utf-8');
    var lines = fileContent.split(/\r?\n/);
    var seedString = lines[0];
    var seedRegexMatch = seedString.match(/\d+/g);
    if (seedRegexMatch == null)
        return;
    var seeds = [];
    for (var i = 0; i < seedRegexMatch.length; ++i)
        seeds.push(+seedRegexMatch[i]);
    //console.log(seeds)
    // Remove the seed lines and the first mapping heading, start from row 4
    var mappingLines = lines.slice(3);
    let MappingType;
    (function (MappingType) {
        MappingType[MappingType["SeedToSoil"] = 0] = "SeedToSoil";
        MappingType[MappingType["SoilToFertilizer"] = 1] = "SoilToFertilizer";
        MappingType[MappingType["FertilizerToWater"] = 2] = "FertilizerToWater";
        MappingType[MappingType["WaterToLight"] = 3] = "WaterToLight";
        MappingType[MappingType["LightToTemperature"] = 4] = "LightToTemperature";
        MappingType[MappingType["TemperatureToHumidity"] = 5] = "TemperatureToHumidity";
        MappingType[MappingType["HumidityToLocation"] = 6] = "HumidityToLocation";
        MappingType[MappingType["Count"] = 7] = "Count";
    })(MappingType || (MappingType = {}));
    var mappingPerType = new Array();
    var currentMappingType = MappingType.SeedToSoil;
    for (var i = 0; i < MappingType.Count; ++i)
        mappingPerType[i] = new Array();
    mappingLines.forEach(line => {
        var regexMatch = line.match(/\d+/g);
        if (regexMatch == null) {
            if (line == "soil-to-fertilizer map:")
                currentMappingType = MappingType.SoilToFertilizer;
            else if (line == "fertilizer-to-water map:")
                currentMappingType = MappingType.FertilizerToWater;
            else if (line == "water-to-light map:")
                currentMappingType = MappingType.WaterToLight;
            else if (line == "light-to-temperature map:")
                currentMappingType = MappingType.LightToTemperature;
            else if (line == "temperature-to-humidity map:")
                currentMappingType = MappingType.TemperatureToHumidity;
            else if (line == "humidity-to-location map:")
                currentMappingType = MappingType.HumidityToLocation;
            // Move to next line
            return;
        }
        var dest = +regexMatch[0];
        var source = +regexMatch[1];
        var count = +regexMatch[2];
        var mapping = new Mapping(source, dest, count);
        mappingPerType[currentMappingType].push(mapping);
        //console.log("dest: " + dest + " source: " + source + " count: " + count)
        //console.log(mapping)
    });
    //console.log(mappingPerType)
    var lowestLocation = Infinity;
    for (var seedId of seeds) {
        var mappedId = seedId;
        for (var mappingTypeIndex = 0; mappingTypeIndex < MappingType.Count; ++mappingTypeIndex) {
            for (var mapping of mappingPerType[mappingTypeIndex]) {
                if (mapping.isInRange(mappedId)) {
                    mappedId = mapping.map(mappedId);
                    break;
                }
            }
        }
        console.log("Seed " + seedId + " mapped to location id " + mappedId);
        // The last mapping type is to location, so save out the lowest location id
        if (mappedId < lowestLocation)
            lowestLocation = mappedId;
    }
    console.log("Lowest Location ID: " + lowestLocation);
}
exports.run05A = run05A;
function run05B() {
    console.log('Running 05B');
    const fileContent = (0, fs_1.readFileSync)('./input/05/input.txt', 'utf-8');
    var lines = fileContent.split(/\r?\n/);
    var seedString = lines[0];
    var seedRegexMatch = seedString.match(/\d+/g);
    if (seedRegexMatch == null)
        return;
    var seedRanges = [];
    // Start counting at 1 to be safe that we are always reading within range when reading pairs
    for (var matchIndex = 1; matchIndex < seedRegexMatch.length; matchIndex += 2) {
        //console.log((matchIndex - 1) + " + " + matchIndex)
        var start = +seedRegexMatch[matchIndex - 1];
        var count = +seedRegexMatch[matchIndex];
        seedRanges.push([start, count]);
    }
    // Remove the seed lines and the first mapping heading, start from row 4
    var mappingLines = lines.slice(3);
    let MappingType;
    (function (MappingType) {
        MappingType[MappingType["SeedToSoil"] = 0] = "SeedToSoil";
        MappingType[MappingType["SoilToFertilizer"] = 1] = "SoilToFertilizer";
        MappingType[MappingType["FertilizerToWater"] = 2] = "FertilizerToWater";
        MappingType[MappingType["WaterToLight"] = 3] = "WaterToLight";
        MappingType[MappingType["LightToTemperature"] = 4] = "LightToTemperature";
        MappingType[MappingType["TemperatureToHumidity"] = 5] = "TemperatureToHumidity";
        MappingType[MappingType["HumidityToLocation"] = 6] = "HumidityToLocation";
        MappingType[MappingType["Count"] = 7] = "Count";
    })(MappingType || (MappingType = {}));
    var mappingPerType = new Array();
    var currentMappingType = MappingType.SeedToSoil;
    for (var i = 0; i < MappingType.Count; ++i)
        mappingPerType[i] = new Array();
    mappingLines.forEach(line => {
        var regexMatch = line.match(/\d+/g);
        if (regexMatch == null) {
            if (line == "soil-to-fertilizer map:")
                currentMappingType = MappingType.SoilToFertilizer;
            else if (line == "fertilizer-to-water map:")
                currentMappingType = MappingType.FertilizerToWater;
            else if (line == "water-to-light map:")
                currentMappingType = MappingType.WaterToLight;
            else if (line == "light-to-temperature map:")
                currentMappingType = MappingType.LightToTemperature;
            else if (line == "temperature-to-humidity map:")
                currentMappingType = MappingType.TemperatureToHumidity;
            else if (line == "humidity-to-location map:")
                currentMappingType = MappingType.HumidityToLocation;
            // Move to next line
            return;
        }
        var dest = +regexMatch[0];
        var source = +regexMatch[1];
        var count = +regexMatch[2];
        var mapping = new Mapping(source, dest, count);
        mappingPerType[currentMappingType].push(mapping);
        //console.log("dest: " + dest + " source: " + source + " count: " + count)
        //console.log(mapping)
    });
    //console.log(mappingPerType)
    var lowestLocation = Infinity;
    for (var seedRange of seedRanges) {
        var seedRangeStart = seedRange[0];
        var seedRangeCount = seedRange[1];
        for (var seedIndex = 0; seedIndex < seedRangeCount; ++seedIndex) {
            var seedId = seedRangeStart + seedIndex;
            var mappedId = seedId;
            for (var mappingTypeIndex = 0; mappingTypeIndex < MappingType.Count; ++mappingTypeIndex) {
                for (var mapping of mappingPerType[mappingTypeIndex]) {
                    if (mapping.isInRange(mappedId)) {
                        mappedId = mapping.map(mappedId);
                        break;
                    }
                }
            }
            //console.log("Seed " + seedId + " mapped to location id " + mappedId)
            // The last mapping type is to location, so save out the lowest location id
            if (mappedId < lowestLocation)
                lowestLocation = mappedId;
        }
    }
    console.log("Lowest Location ID: " + lowestLocation);
}
exports.run05B = run05B;
