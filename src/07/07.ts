import { readFileSync } from 'fs';

enum CardType
{
    WildCardJ = 1,
    Two,
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

function getCardType(character: string, allowWildCards: boolean): CardType
{
    switch(character)
    {
        case "T":
            return CardType.T
        case "J":
            return allowWildCards ? CardType.WildCardJ : CardType.J
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

function toString(handType: HandType): string
{
    switch (handType)
    {
        case HandType.HighCard:
            return "HighCard"
        case HandType.OnePair:
            return "OnePair"
        case HandType.TwoPairs:
            return "TwoPairs"
        case HandType.ThreeOfAKind:
            return "ThreeOfAKind"
        case HandType.FullHouse:
            return "FullHouse"
        case HandType.FourOfAKind:
            return "FourOfAKind"
        case HandType.FiveOfAKind:
            return "FiveOfAKind"
    }
    return ""
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

// sorts from worst hands to best hands
// returns positive if a is smaller than b
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

        var cards: CardType[] = getCards(handString, false)

        var handType: HandType = getHandType(cards)

        //console.log("Hand: " + handString + " => " + cards + " - Type: " + toString(handType) + " - bid: " + bid)

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
}

function getCards(hand: string, allowWildCards: boolean): CardType[]
{
    var parsedCards: CardType[] = []

    for (var i = 0; i < hand.length; ++i)
    {
        var card: CardType = getCardType(hand[i], allowWildCards)
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

    // Check wild card count and then clear them so we don't handle them like any card
    var wildCardCount: number = cardCounts[CardType.WildCardJ];
    cardCounts[CardType.WildCardJ] = 0

    if (cardCounts.includes(5))
    {
        return HandType.FiveOfAKind
    }
    else if (cardCounts.includes(4))
    {
        if (wildCardCount == 1)
            return HandType.FiveOfAKind

        return HandType.FourOfAKind
    }
    else if (cardCounts.includes(3))
    {
        if (wildCardCount == 2)
            return HandType.FiveOfAKind
        else if (wildCardCount == 1)
            return HandType.FourOfAKind
        else if (cardCounts.includes(2))
            return HandType.FullHouse
        
        return HandType.ThreeOfAKind
    }
    else if (cardCounts.includes(2))
    {
        var hasAnotherPair: boolean = (cardCounts.filter(value => {return value == 2}).length == 2)

        if (wildCardCount == 3)
            return HandType.FiveOfAKind
        else if (wildCardCount == 2)
            return HandType.FourOfAKind
        else if (wildCardCount == 1)
            return hasAnotherPair ? HandType.FullHouse : HandType.ThreeOfAKind
        else if (hasAnotherPair)
            return HandType.TwoPairs
        
        return HandType.OnePair
    }

    // Down here we know that no non-wildcard has more than 1 of each card, so just combine the wildcards with the unique rest in the best possible way 

    // Both 4 and 5 wild cards give us FiveOfAKind because the 4 can be combined with the 5th random card
    if (wildCardCount >= 4)
        return HandType.FiveOfAKind
    else if (wildCardCount == 3)
        return HandType.FourOfAKind
    else if (wildCardCount == 2)
        return HandType.ThreeOfAKind
    else if (wildCardCount == 1)
        return HandType.OnePair

    return HandType.HighCard
}

export function run07B() : void
{
    console.log('Running 07B')

    const fileContent = readFileSync('./input/07/input.txt', 'utf-8')

    var lines: string[] = fileContent.split(/\r?\n/)

    var hands: Hand[] = []

    lines.forEach(line => {
        var handAndBid: string[] = line.split(" ")
        var handString: string = handAndBid[0]
        var bid: number = +handAndBid[1]

        var cards: CardType[] = getCards(handString, true)

        var handType: HandType = getHandType(cards)

        //console.log("Hand: " + handString + " => " + cards + " - Type: " + toString(handType) + " - bid: " + bid)

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
}