// Query Selectors
const newGameBtn = document.querySelector("#newGame");
const boardSquares = document.querySelectorAll(".boardSq");

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
  let checkWin = (board) => {
    // WRITE LOGIC TO CHECK ALL WINNING POSSIBLITIES
    // END GAME WHEN WINNER CHECK IF IT IS PLAYER ONE OR PLAYER TWO
    // DISPLAY CONGRAULATIONS MESSAGE
    // UP PLAYERS SCORE
    // REMOVE ALL EVENT LISTENERS FROM BOARD
    // ASK IF PLAYER WOULD LIKE ANOTHER ROUND
    // IF YES RUN NEWGAME FUNCTION AGAIN
    // ADD OPTION FOR PLAYERS TO UPDATE NAME
    if (board[0] === "X" && board[1] === "X" && board[2] === "X") {
      console.log("Player One wins");
    }
    return;
  };

  let newGame = (playerOne, playerTwo) => {
    boardSquares.forEach((box) => {
      box.addEventListener("click", (e) => {
        if (playerOne.turn === true) {
          box.textContent = "X";
          gameBoard.board[box.dataset.index] = "X";
          playerOne.turn = false;
          playerTwo.turn = true;
        } else {
          box.textContent = "O";
          gameBoard.board[box.dataset.index] = "O";
          playerOne.turn = true;
          playerTwo.turn = false;
        }
        checkWin(gameBoard.board);
      });
    });
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
  };

  let restartGame = () => {
    // WRITE LOGIC FOR RESTART BTN
  };
  return { newGame, restartGame, checkWin };
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
