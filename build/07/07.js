"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run07B = exports.run07A = void 0;
const fs_1 = require("fs");
var CardType;
(function (CardType) {
    CardType[CardType["WildCardJ"] = 1] = "WildCardJ";
    CardType[CardType["Two"] = 2] = "Two";
    CardType[CardType["Three"] = 3] = "Three";
    CardType[CardType["Four"] = 4] = "Four";
    CardType[CardType["Five"] = 5] = "Five";
    CardType[CardType["Six"] = 6] = "Six";
    CardType[CardType["Seven"] = 7] = "Seven";
    CardType[CardType["Eight"] = 8] = "Eight";
    CardType[CardType["Nine"] = 9] = "Nine";
    CardType[CardType["T"] = 10] = "T";
    CardType[CardType["J"] = 11] = "J";
    CardType[CardType["Q"] = 12] = "Q";
    CardType[CardType["K"] = 13] = "K";
    CardType[CardType["A"] = 14] = "A";
    CardType[CardType["Invalid"] = -1] = "Invalid";
})(CardType || (CardType = {}));
function getCardType(character, allowWildCards) {
    switch (character) {
        case "T":
            return CardType.T;
        case "J":
            return allowWildCards ? CardType.WildCardJ : CardType.J;
        case "Q":
            return CardType.Q;
        case "K":
            return CardType.K;
        case "A":
            return CardType.A;
    }
    var characterAsNumber = +character;
    if (characterAsNumber >= 2 && characterAsNumber <= 9)
        return characterAsNumber;
    return CardType.Invalid;
}
var HandType;
(function (HandType) {
    HandType[HandType["HighCard"] = 0] = "HighCard";
    HandType[HandType["OnePair"] = 1] = "OnePair";
    HandType[HandType["TwoPairs"] = 2] = "TwoPairs";
    HandType[HandType["ThreeOfAKind"] = 3] = "ThreeOfAKind";
    HandType[HandType["FullHouse"] = 4] = "FullHouse";
    HandType[HandType["FourOfAKind"] = 5] = "FourOfAKind";
    HandType[HandType["FiveOfAKind"] = 6] = "FiveOfAKind";
})(HandType || (HandType = {}));
function toString(handType) {
    switch (handType) {
        case HandType.HighCard:
            return "HighCard";
        case HandType.OnePair:
            return "OnePair";
        case HandType.TwoPairs:
            return "TwoPairs";
        case HandType.ThreeOfAKind:
            return "ThreeOfAKind";
        case HandType.FullHouse:
            return "FullHouse";
        case HandType.FourOfAKind:
            return "FourOfAKind";
        case HandType.FiveOfAKind:
            return "FiveOfAKind";
    }
    return "";
}
class Hand {
    constructor(handString, cards, bid, handType) {
        this.handString = handString;
        this.cards = cards;
        this.bid = bid;
        this.handType = handType;
    }
}
// sorts from worst hands to best hands
// returns positive if a is smaller than b
function CompareHands(a, b) {
    if (a.handType == b.handType) {
        for (var i = 0; i < a.cards.length; ++i) {
            if (a.cards[i] == b.cards[i])
                continue;
            return (a.cards[i] - b.cards[i]);
        }
    }
    return a.handType - b.handType;
}
function run07A() {
    console.log('Running 07A');
    const fileContent = (0, fs_1.readFileSync)('./input/07/input.txt', 'utf-8');
    var lines = fileContent.split(/\r?\n/);
    var hands = [];
    lines.forEach(line => {
        var handAndBid = line.split(" ");
        var handString = handAndBid[0];
        var bid = +handAndBid[1];
        var cards = getCards(handString, false);
        var handType = getHandType(cards);
        //console.log("Hand: " + handString + " => " + cards + " - Type: " + toString(handType) + " - bid: " + bid)
        hands.push(new Hand(handString, cards, bid, handType));
    });
    //console.log(hands)
    hands.sort(CompareHands);
    //console.log("Sorted Hands: ")
    //console.log(hands)
    var sum = 0;
    for (var i = 0; i < hands.length; ++i) {
        var hand = hands[i];
        var handRank = i + 1;
        var handValue = hand.bid * handRank;
        sum += handValue;
    }
    console.log("Sum: " + sum);
}
exports.run07A = run07A;
function getCards(hand, allowWildCards) {
    var parsedCards = [];
    for (var i = 0; i < hand.length; ++i) {
        var card = getCardType(hand[i], allowWildCards);
        parsedCards.push(card);
    }
    return parsedCards;
}
function getHandType(parsedCards) {
    var cardCounts = new Array(CardType.A + 1);
    cardCounts.fill(0);
    for (var i = 0; i < parsedCards.length; ++i) {
        if (parsedCards[i] != CardType.Invalid)
            cardCounts[parsedCards[i]]++;
    }
    // Check wild card count and then clear them so we don't handle them like any card
    var wildCardCount = cardCounts[CardType.WildCardJ];
    cardCounts[CardType.WildCardJ] = 0;
    if (cardCounts.includes(5)) {
        return HandType.FiveOfAKind;
    }
    else if (cardCounts.includes(4)) {
        if (wildCardCount == 1)
            return HandType.FiveOfAKind;
        return HandType.FourOfAKind;
    }
    else if (cardCounts.includes(3)) {
        if (wildCardCount == 2)
            return HandType.FiveOfAKind;
        else if (wildCardCount == 1)
            return HandType.FourOfAKind;
        else if (cardCounts.includes(2))
            return HandType.FullHouse;
        return HandType.ThreeOfAKind;
    }
    else if (cardCounts.includes(2)) {
        var hasAnotherPair = (cardCounts.filter(value => { return value == 2; }).length == 2);
        if (wildCardCount == 3)
            return HandType.FiveOfAKind;
        else if (wildCardCount == 2)
            return HandType.FourOfAKind;
        else if (wildCardCount == 1)
            return hasAnotherPair ? HandType.FullHouse : HandType.ThreeOfAKind;
        else if (hasAnotherPair)
            return HandType.TwoPairs;
        return HandType.OnePair;
    }
    // Down here we know that no non-wildcard has more than 1 of each card, so just combine the wildcards with the unique rest in the best possible way 
    // Both 4 and 5 wild cards give us FiveOfAKind because the 4 can be combined with the 5th random card
    if (wildCardCount >= 4)
        return HandType.FiveOfAKind;
    else if (wildCardCount == 3)
        return HandType.FourOfAKind;
    else if (wildCardCount == 2)
        return HandType.ThreeOfAKind;
    else if (wildCardCount == 1)
        return HandType.OnePair;
    return HandType.HighCard;
}
function run07B() {
    console.log('Running 07B');
    const fileContent = (0, fs_1.readFileSync)('./input/07/input.txt', 'utf-8');
    var lines = fileContent.split(/\r?\n/);
    var hands = [];
    lines.forEach(line => {
        var handAndBid = line.split(" ");
        var handString = handAndBid[0];
        var bid = +handAndBid[1];
        var cards = getCards(handString, true);
        var handType = getHandType(cards);
        //console.log("Hand: " + handString + " => " + cards + " - Type: " + toString(handType) + " - bid: " + bid)
        hands.push(new Hand(handString, cards, bid, handType));
    });
    //console.log(hands)
    hands.sort(CompareHands);
    //console.log("Sorted Hands: ")
    //console.log(hands)
    var sum = 0;
    for (var i = 0; i < hands.length; ++i) {
        var hand = hands[i];
        var handRank = i + 1;
        var handValue = hand.bid * handRank;
        sum += handValue;
    }
    console.log("Sum: " + sum);
}
exports.run07B = run07B;
