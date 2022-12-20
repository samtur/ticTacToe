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
  const clearBoard = () => {};
  return { board, displayBoard, clearBoard };
})();

const gameController = (() => {
  let checkWin = (board) => {
    const allX = (currentValue) => currentValue === "X";
    const allO = (currentValue) => currentValue === "O";
    // END GAME WHEN WINNER CHECK IF IT IS PLAYER ONE OR PLAYER TWO
    // DISPLAY CONGRAULATIONS MESSAGE
    // USE A DIV TO HOLD MESSAGE AT THE BOTTOM
    // UP PLAYERS SCORE
    // REMOVE ALL EVENT LISTENERS FROM BOARD
    // REMOVE WINNER MESSAGE
    // ASK IF PLAYER WOULD LIKE ANOTHER ROUND
    // IF YES RUN NEWGAME FUNCTION AGAIN
    // IF NO CURRENT A FUNCTION TO CLEAR EVERYTHING, BOARD AND SCORES
    // ADD OPTION FOR PLAYERS TO UPDATE NAME
    // ADD RESTART BUTTON AND FUNCTION WHICH RESTARTS CURRENT GAME
    // LET NEW GAME BTN WIPE BOARD AND SCORES ON PRESS.
    let check1 = [0, 1, 2].map((x) => board[x]);
    let check2 = [3, 4, 5].map((x) => board[x]);
    let check3 = [6, 7, 8].map((x) => board[x]);
    let check4 = [2, 5, 8].map((x) => board[x]);
    let check5 = [1, 4, 7].map((x) => board[x]);
    let check6 = [0, 3, 6].map((x) => board[x]);
    let check7 = [0, 4, 8].map((x) => board[x]);
    let check8 = [6, 4, 2].map((x) => board[x]);
    if (
      check1.every(allX) ||
      check2.every(allX) ||
      check3.every(allX) ||
      check4.every(allX) ||
      check5.every(allX) ||
      check6.every(allX) ||
      check7.every(allX) ||
      check8.every(allX)
    ) {
      document.querySelector("#winMsg").textContent = "Player One Wins!";
      return;
    } else if (
      check1.every(allO) ||
      check2.every(allO) ||
      check3.every(allO) ||
      check4.every(allO) ||
      check5.every(allO) ||
      check6.every(allO) ||
      check7.every(allO) ||
      check8.every(allO)
    ) {
      document.querySelector("#winMsg").textContent = "Player Two Wins!";
      return;
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
