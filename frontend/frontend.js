window.onload = function () {
  
  // Get texts for the frontend from the API  
  // I'm using axios to handle the requests =) 
  // after define the initial value for the game 

  axios.get("api/uitext").then(response => {

    new Vue({
      el: "#vue",
      data: {

        ui: response.data.ui,

        // 5 dices for the game 
        dice1: "0",
        dice2: "0",
        dice3: "0",
        dice4: "0",
        dice5: "0",

        // selected dice 
        dice1Selected: false,
        dice2Selected: false,
        dice3Selected: false,
        dice4Selected: false,
        dice5Selected: false,
  
        // players handlers 

        activeGameId: 0,
        numberOfPlayers: 0,

        activePlayer: 0,
        activePlayerName: "",

        player1NameInput: "",
        player1TypeInput: "N",
        playerName: [""],

        // Rounds and throws counter 

        roundNumber: [0, 0, 0, 0],
        throwNumber: [0, 0, 0, 0],
        activeRoundNumber: 0,
        activeThrowNumber: 0,

        
        // Game Id handler 

        gameId: [0, 0, 0, 0],
        gameStarted: false,
        gameTable: [{}, {}, {}, {}],
        endGameSituation: false,
 
        onesValue: ["", "", "", ""],
        twosValue: ["", "", "", ""],
        threesValue: ["", "", "", ""],
        foursValue: ["", "", "", ""],
        fivesValue: ["", "", "", ""],
        sixesValue: ["", "", "", ""],
        bonusValue: ["", "", "", ""],

        onePairValue: ["", "", "", ""],
        twoPairsValue: ["", "", "", ""],
        threeOfAKindValue: ["", "", "", ""],
        fourOfAKindValue: ["", "", "", ""],

        smallStraightValue: ["", "", "", ""],
        largeStraightValue: ["", "", "", ""],
        fullHouseValue: ["", "", "", ""],
        chanceValue: ["", "", "", ""],

        yatzyValue: ["", "", "", ""],
        totalValue: ["", "", "", ""],

        disableClick: { "pointer-events": "" }
      },
      methods: {

        //  initialize values for new game
        
        clickNewGame: function (playerCount, numberOfPlayers) {
          
          this.playerNames = [this.player1NameInput];

          if (playerCount <= numberOfPlayers) {

            this.onesValue = ["", "", "", ""];
            this.twosValue = ["", "", "", ""];
            this.threesValue = ["", "", "", ""];
            this.foursValue = ["", "", "", ""];
            this.fivesValue = ["", "", "", ""];
            this.sixesValue = ["", "", "", ""];
            this.bonusValue = ["", "", "", ""];
            this.onePairValue = ["", "", "", ""];
            this.twoPairsValue = ["", "", "", ""];
            this.threeOfAKindValue = ["", "", "", ""];
            this.fourOfAKindValue = ["", "", "", ""];
            this.smallStraightValue = ["", "", "", ""];
            this.largeStraightValue = ["", "", "", ""];
            this.fullHouseValue = ["", "", "", ""];
            this.chanceValue = ["", "", "", ""];
            this.yatzyValue = ["", "", "", ""];
            this.totalValue = ["", "", "", ""];

            axios
              .post("api/newgame", {
                PLAYERNAME: this.playerNames[1]
              })
              .then(response => {

                this.gameId[0] = response.data.gameId;
                this.endGameSituation = false;
                this.totalValue[0] = "";
                
                  this.newRound(this.gameId[0], this.activePlayer);
                  this.gameStarted = true;
                
                playerCount++;
                console.log(playerCount);
                this.clickNewGame(playerCount, numberOfPlayers);
              });
          }
        },

        //  initialize values for new round
        newRound: function(gameId, activePlayer) {
          
            this.disableClick = { "pointer-events": "" };
          
          axios.post("api/newround", { GAMEID: gameId }).then(response => {
            
            // reset dice values 
            this.activeGameId = gameId;

            this.dice1 = "0";
            this.dice2 = "0";
            this.dice3 = "0";
            this.dice4 = "0";
            this.dice5 = "0";

            // selected dice
            this.dice1Selected = false;
            this.dice2Selected = false;
            this.dice3Selected = false;
            this.dice4Selected = false;
            this.dice5Selected = false;

            // round number and set throw number to one in case of restart or new game 
            this.roundNumber[activePlayer] = response.data.round;
            this.throwNumber[activePlayer] = 1;
            this.activeRoundNumber = this.roundNumber[activePlayer];
            this.activeThrowNumber = this.throwNumber[activePlayer];
            this.activePlayerName = this.playerNames[activePlayer];
           
          });
        },

        // Send post req with to throwdice.
        // Set dice rndom values according to what backend responded.

        clickThrowDice: function(gameId, activePlayer) {
          axios
            .post("api/throwdice", {
              GAMEID: gameId[activePlayer],
              ONE: this.dice1Selected,
              TWO: this.dice2Selected,
              THREE: this.dice3Selected,
              FOUR: this.dice4Selected,
              FIVE: this.dice5Selected,
            })
            .then(response => {
              this.dice1 = response.data.dice[0];
              this.dice2 = response.data.dice[1];
              this.dice3 = response.data.dice[2];
              this.dice4 = response.data.dice[3];
              this.dice5 = response.data.dice[4];
              this.gameTable[activePlayer] = response.data.gameTable;
              this.throwNumber[activePlayer] = response.data.throw;
              this.activeThrowNumber = this.throwNumber[activePlayer];
            
            });
        },

        // Player clicks a combination to end round, send post to api/endround  and selected result.
        // This will define how many points player will get. 
        // Points calculated in backend check the score module

        clickEndRound: function(gameId, selectedResult) {
          if (
            this.dice1 != "-" &&
            this.gameTable[this.activePlayer][selectedResult + "Done"] == false
          ) {
            this.dice1 = "-";
            this.dice2 = "-";
            this.dice3 = "-";
            this.dice4 = "-";
            this.dice5 = "-";
            axios
              .post("api/endround", {
                GAMEID: gameId,
                SELECTEDRESULT: selectedResult
              })
              .then(response => {
                this[selectedResult + "Value"][this.activePlayer] =
                  response.data.gameTable[selectedResult];
                this.bonusValue[this.activePlayer] =
                  response.data.gameTable.bonus;
                this.totalValue[this.activePlayer] = response.data.total;
                if (this.activePlayer < this.numberOfPlayers) {
                  if (this.roundNumber[this.activePlayer] == 15) {
                    this.endGame(
                      this.gameId[this.activePlayer],
                      this.activePlayer
                    );
                  }
                  this.activePlayer++;
                  this.newRound(
                    this.gameId[this.activePlayer],
                    this.activePlayer
                  );
                } else {
                  if (this.roundNumber[this.activePlayer] == 15) {
                    this.endGame(
                      this.gameId[this.activePlayer],
                      this.activePlayer
                    );
                  } else {
                    this.activePlayer = 0;
                    this.newRound(
                      this.gameId[this.activePlayer],
                      this.activePlayer
                    );
                  }
                }
              });
          }
        },

        // When clickEndRound is run and if the round number is 15.
        // Then this method is run. End game. Send post with gameid. 

        endGame: function(gameId, activePlayer) {
          axios.post("api/endGame", { GAMEID: gameId }).then(response => {
            if (activePlayer == this.numberOfPlayers) {
              this.endGameSituation = true;
              this.activePlayer = 0;
              this.activeAiPlayer = "N";
            }
          });
        },

      

     
      }
    });
  });
};
