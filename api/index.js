"use strict";
let games = [];
const uiText = require("./uitext.js");


// api routes
module.exports = (score, roll, game, app) => {

  // new game.
  app.post("/api/newgame", (req, res) => {
    games = game.newGame(games, req.body.PLAYERNAME);
    res.status(200).json(games[games.length - 1]);
  });

  // Start a new round.
  app.post("/api/newround", (req, res) => {
    games = game.newRound(req.body.GAMEID, games);
    res.status(200).json(games[req.body.GAMEID - 1]);
  });

  // Throw dice.
  app.post("/api/throwdice", (req, res) => {

    games = game.throwDice(req.body, games, roll, score);
    res.status(200).json(games[req.body.GAMEID - 1]);

  });

  // End round.
  app.post("/api/endround", (req, res) => {

    games = game.endRound(
      req.body.GAMEID,
      req.body.SELECTEDRESULT,
      games,
      score
    );
    res.status(200).json(games[req.body.GAMEID - 1]);
  });

  // End game.
  app.post("/api/endgame", (req, res) => {
    games = game.endGame(req.body.GAMEID, games);
    res.status(200).json(games[req.body.GAMEID - 1]);
  });


  // Get UI texts to frontend.
  app.get("/api/uitext", (req, res) => {
    res.status(200).json(uiText);
  });
};
