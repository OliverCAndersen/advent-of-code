import { readFileSync } from 'fs';

enum CardType
{
    Two = 2,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    T,
    J,
    Q,
    K,
    A,
    Invalid = -1,
}

function getCardType(character: string): CardType
{
    switch(character)
    {
        case "T":
            return CardType.T
        case "J":
            return CardType.J
        case "Q":
            return CardType.Q
        case "K":
            return CardType.K
        case "A":
            return CardType.A
    }

    var characterAsNumber: number = +character
    if (characterAsNumber >= 2 && characterAsNumber <= 9)
        return characterAsNumber as CardType

    return CardType.Invalid
}

enum HandType
{
    HighCard = 0,
    OnePair,
    TwoPairs,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
}

class Hand
{
    constructor(handString: string, cards: CardType[], bid: number, handType: HandType)
    {
        this.handString = handString
        this.cards = cards
        this.bid = bid
        this.handType = handType
    }

    handString: string
    cards: CardType[]
    bid: number
    handType: HandType
}

type CardTypeToCountMap = { [cardType: number]: number; };

// sorts from worst hands to best hands
// returns negative if b is bigger than a
function CompareHands(a: Hand, b: Hand) 
{
    if (a.handType == b.handType)
    {        
        for (var i = 0; i < a.cards.length; ++i)
        {
            if (a.cards[i] == b.cards[i])
                continue

            return (a.cards[i] - b.cards[i])
        }
    }

    return a.handType - b.handType
}

export function run07A() : void
{
    console.log('Running 07A')

    const fileContent = readFileSync('./input/07/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var hands: Hand[] = []

    lines.forEach(line => {
        var handAndBid: string[] = line.split(" ")
        var handString: string = handAndBid[0]
        var bid: number = +handAndBid[1]

        var cards: CardType[] = getCards(handString)

        var handType: HandType = getHandType(cards)

        //console.log("Hand: " + handString + " => " + handType + " - bid: " + bid)

        hands.push(new Hand(handString, cards, bid, handType))
    })

    //console.log(hands)

    hands.sort(CompareHands)

    //console.log("Sorted Hands: ")
    //console.log(hands)

    var sum = 0
    for (var i = 0; i < hands.length; ++i)
    {
        var hand: Hand = hands[i]
        var handRank = i + 1
        var handValue = hand.bid * handRank
        sum += handValue
    }

    console.log("Sum: " + sum)

    //console.log("times: " + times)
    //console.log("distances: " + distances) 

    //console.log("Winning Hold Times Product: " + winningHoldTimesProduct)
}

function getCards(hand: string): CardType[]
{
    var parsedCards: CardType[] = []

    for (var i = 0; i < hand.length; ++i)
    {
        var card: CardType = getCardType(hand[i])
        parsedCards.push(card)
    }

    return parsedCards
}

function getHandType(parsedCards: CardType[]): HandType
{
    var cardCounts = new Array<number>(CardType.A + 1)
    cardCounts.fill(0)

    for (var i = 0; i < parsedCards.length; ++i)
    {
        if (parsedCards[i] != CardType.Invalid)
            cardCounts[parsedCards[i]]++
    }

    if (cardCounts.includes(5))
    {
        return HandType.FiveOfAKind
    }
    else if (cardCounts.includes(4))
    {
        return HandType.FourOfAKind
    }
    else if (cardCounts.includes(3))
    {
        if (cardCounts.includes(2))
            return HandType.FullHouse
        else
            return HandType.ThreeOfAKind
    }
    else if (cardCounts.includes(2))
    {
        if (cardCounts.filter(value => {return value == 2}).length == 2)
            return HandType.TwoPairs
        else
            return HandType.OnePair
    }

    return HandType.HighCard
}

function parseNumbersFromText(parseNumbersFromText: string): number[]
{
    var regexMatch: RegExpMatchArray | null = parseNumbersFromText.match(/\d+/g)
    if (regexMatch == null)
        return []

    var numbers: number[] = []
    regexMatch.forEach(match => { numbers.push(+match) })
    return numbers
}

export function run07B() : void
{
    console.log('Running 07B')

}