"use strict";

module.exports = {
  execute: (gameId, games) => {
    
    let index = games
      .map(o => {
        return o.gameId;
      })
      .indexOf(gameId);

    // End game.

    games[index].round = 16;
    games[index].throw = 4;
 
    return games;
  }
};
