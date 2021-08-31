"use strict";

// Game game functionality to start game - switch rounds 

let newGame = require("./newgame.js");
let newRound = require("./newround.js");
let throwDice = require("./throwdice.js");
let endRound = require("./endround.js");
let endGame = require("./endgame.js");


module.exports = {
  newGame: (games, playerName) => {
    return newGame.execute(games, playerName);
  },
  newRound: (gameId, games) => {
    return newRound.execute(gameId, games);
  },
  throwDice: (reqbody, games, roll, score) => {
    return throwDice.execute(reqbody, games, roll, score);
  },
  endRound: (gameId, selectedResult, games, score) => {
    return endRound.execute(gameId, selectedResult, games, score);
  },
  endGame: (gameId, games) => {
    return endGame.execute(gameId, games);
  }
};
