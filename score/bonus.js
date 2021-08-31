"use strict";
module.exports = {
  'calculate': amount => {

    // if score is higher that 63 add 50 bonus
    
    let bonus = 0;
    if (amount >= 63) {
      bonus = 50;
    }
    return bonus;
  }
};
