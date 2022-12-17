// Query Selectors
const newGameBtn = document.querySelector("#newGame");

// Factory Functions and Modules
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const displayBoard = () => {
    for (i in board) {
      document.querySelector(`#sq${i}`).textContent = `${board[i]}`;
    }
  };
  return { board, displayBoard };
})();

const gameController = (() => {
  let newGame = (playerOne, playerTwo) => {
    document.querySelector(
      "#player1Name"
    ).textContent = `${playerOne.playerName}`;
    document.querySelector(
      "#player1Score"
    ).textContent = `${playerOne.playerScore}`;
    document.querySelector(
      "#player2Name"
    ).textContent = `${playerTwo.playerName}`;
    document.querySelector(
      "#player2Score"
    ).textContent = `${playerTwo.playerScore}`;
    playerOne.turn = true;
    playerTwo.turn = false;
    checkTurn(playerOne, playerTwo);
  };
  let checkTurn = (playerOne, playerTwo) => {
    if (playerOne.turn) {
      document.querySelectorAll(".boardSq").forEach((box) => {
        box.addEventListener("click", (e) => {
          box.textContent = "X";
          console.log(gameBoard.board);
          // NEED TO UPDATE GAMEBOARD ARRAY!
          // SWITCH TURN FLAGS
          // CHECK FOR TURN AGAIN
          // REPEAT UNTIL WINNING CONDITION MET
          // MAKE FUNCTION TO CHECK FOR WIN!
        });
      });
    }
  };
  let restartGame = () => {};
  return { newGame, checkTurn, restartGame };
})();

const player = (name, score, counter) => {
  let playerName = name;
  let playerScore = score;
  let turn = true;
  let icon = counter;
  return { playerName, playerScore, turn, icon };
};

// Event Listeners
newGameBtn.addEventListener("click", (e) => {
  const playerOne = player("Player One", 0, "X");
  const playerTwo = player("Player Two", 0, "O");
  gameController.newGame(playerOne, playerTwo);
});
