"use strict";
module.exports = {
  throwDice: () => {

    // Generate random number between 1 and 6
    let rand = 1 + Math.floor(Math.random() * 6);
    return rand;
  }
};
