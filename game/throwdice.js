"use strict";
module.exports = {
  execute: (reqbody, games, roll, score) => {
    let gameId = reqbody.GAMEID;
    let first = reqbody.ONE;
    let second = reqbody.TWO;
    let third = reqbody.THREE;
    let fourth = reqbody.FOUR;
    let fifth = reqbody.FIVE;
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);
    games[index].throw++;

    // Throw all  if first round.Otherwise select which to throw.
    // Do not throw if throw number or round number is off the scale of yatzy rules.
    if (games[index].throw < 4 && games[index].round < 16) {
      if (games[index].throw == 1 || first == false) {
        games[index].dice[0] = roll.throwDice();
      }
      if (games[index].throw == 1 || second == false) {
        games[index].dice[1] = roll.throwDice();
      }
      if (games[index].throw == 1 || third == false) {
        games[index].dice[2] = roll.throwDice();
      }
      if (games[index].throw == 1 || fourth == false) {
        games[index].dice[3] = roll.throwDice();
      }
      if (games[index].throw == 1 || fifth == false) {
        games[index].dice[4] = roll.throwDice();
      }
    } else {
      games[index].throw = 3;
    }

  
    return games;
  }
};
