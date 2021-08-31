"use strict";
let gameId = 0;
module.exports = {
  execute: (games, playerName) => {
  
    gameId++;
    const gameTable = {
      ones: 0,
      onesDone: false,
      twos: 0,
      twosDone: false,
      threes: 0,
      threesDone: false,
      fours: 0,
      foursDone: false,
      fives: 0,
      fivesDone: false,
      sixes: 0,
      sixesDone: false,
      bonus: 0,
      onePair: 0,
      onePairDone: false,
      twoPairs: 0,
      twoPairsDone: false,
      threeOfAKind: 0,
      threeOfAKindDone: false,
      fourOfAKind: 0,
      fourOfAKindDone: false,
      smallStraight: 0,
      smallStraightDone: false,
      largeStraight: 0,
      largeStraightDone: false,
      fullHouse: 0,
      fullHouseDone: false,
      chance: 0,
      chanceDone: false,
      yatzy: 0,
      yatzyDone: false
    };
    games.push({
      gameId: gameId,
      playerName: playerName,
      round: 0,
      throw: 0,
      total: 0,
      dice: [0, 0, 0, 0, 0],
      gameTable: gameTable
    });
    return games;
  }
};
