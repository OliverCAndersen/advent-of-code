import { readFileSync } from 'fs';

type Range = [start: number, end: number]

class Mapping
{
    sourceRange: Range;
    idModifier: number;

    constructor(source: number, dest: number, count: number)
    {
        this.sourceRange = [source, source + count - 1]
        this.idModifier = dest - source
    }

    isInRange(id: number): boolean
    {
        return id >= this.sourceRange[0] && id <= this.sourceRange[1]
    }

    map(id: number): number
    {
        // Out of range -> keep same id
        if (id < this.sourceRange[0] && id > this.sourceRange[1])
            return id

        return id + this.idModifier
    }
}

export function run05A() : void
{
    console.log('Running 05A')

    const fileContent = readFileSync('./input/05/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var seedString = lines[0]

    var seedRegexMatch: RegExpMatchArray | null = seedString.match(/\d+/g)
    if (seedRegexMatch == null)
        return

    var seeds: number[] = []
    for (var i = 0; i < seedRegexMatch.length; ++i)
        seeds.push(+seedRegexMatch[i])

    //console.log(seeds)

    // Remove the seed lines and the first mapping heading, start from row 4
    var mappingLines = lines.slice(3)

    enum MappingType    
    {
        SeedToSoil = 0,
        SoilToFertilizer,
        FertilizerToWater,
        WaterToLight,
        LightToTemperature,
        TemperatureToHumidity,
        HumidityToLocation,
        Count
    }

    var mappingPerType = new Array<Array<Mapping>>()
    var currentMappingType = MappingType.SeedToSoil
    for (var i = 0; i < MappingType.Count; ++i)
        mappingPerType[i] = new Array<Mapping>()

    mappingLines.forEach(line =>  {
        var regexMatch : RegExpMatchArray | null = line.match(/\d+/g)
        if (regexMatch == null)   
        {
            if (line == "soil-to-fertilizer map:")
                currentMappingType = MappingType.SoilToFertilizer
            else if (line == "fertilizer-to-water map:")
                currentMappingType = MappingType.FertilizerToWater
            else if (line == "water-to-light map:")
                currentMappingType = MappingType.WaterToLight
            else if (line == "light-to-temperature map:")
                currentMappingType = MappingType.LightToTemperature
            else if (line == "temperature-to-humidity map:")
                currentMappingType = MappingType.TemperatureToHumidity
            else if (line == "humidity-to-location map:")
                currentMappingType = MappingType.HumidityToLocation

            // Move to next line
            return
        }

        var dest: number = +regexMatch[0]
        var source: number = +regexMatch[1]
        var count: number = +regexMatch[2]

        var mapping = new Mapping(source, dest, count)

        mappingPerType[currentMappingType].push(mapping)

        //console.log("dest: " + dest + " source: " + source + " count: " + count)
        //console.log(mapping)
    });

    //console.log(mappingPerType)

    var lowestLocation: number = Infinity

    for (var seedId of seeds)
    {
        var mappedId: number = seedId
        for (var mappingTypeIndex = 0; mappingTypeIndex < MappingType.Count; ++mappingTypeIndex)
        {
            for (var mapping of mappingPerType[mappingTypeIndex])
            {
                if (mapping.isInRange(mappedId))
                {
                    mappedId = mapping.map(mappedId)
                    break
                }
            }
        }

        console.log("Seed " + seedId + " mapped to location id " + mappedId)

        // The last mapping type is to location, so save out the lowest location id
        if (mappedId < lowestLocation)
            lowestLocation = mappedId
    }

    console.log("Lowest Location ID: " + lowestLocation)
}

export function run05B() : void
{
    console.log('Running 05B')

    
}