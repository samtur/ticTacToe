// Query Selectors
const newGameBtn = document.querySelector("#newGame");
const boardSquares = document.querySelectorAll(".boardSq");

// Gameboard Module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const displayBoard = () => {
    for (i in board) {
      document.querySelector(`#sq${i}`).textContent = `${board[i]}`;
    }
  };
  const clearBoard = () => {
    for (i in board) {
      board[i] = "";
      document.querySelector(`#sq${i}`).textContent = `${board[i]}`;
    }
  };
  return { board, displayBoard, clearBoard };
})();

// Player Factory
const player = (name, score, counter) => {
  let playerName = name;
  let playerScore = score;
  let turn = true;
  let icon = counter;
  return { playerName, playerScore, turn, icon };
};

const playerOne = player("Player One", 0, "X");
const playerTwo = player("Player Two", 0, "O");

// Game Controller Module
const gameController = (() => {
  let newGame = (playerOne, playerTwo) => {
    const tracker = function tracker() {
      if (playerOne.turn === true) {
        this.textContent = "X";
        gameBoard.board[this.dataset.index] = "X";
        playerOne.turn = false;
        playerTwo.turn = true;
      } else {
        this.textContent = "O";
        gameBoard.board[this.dataset.index] = "O";
        playerOne.turn = true;
        playerTwo.turn = false;
      }
      checkWin(gameBoard.board, tracker, playerOne, playerTwo);
    };
    boardSquares.forEach((box) => box.addEventListener("click", tracker));
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
    return playerOne, playerTwo;
  };

  let checkWin = (board, track, playerOne, playerTwo) => {
    const allX = (currentValue) => currentValue === "X";
    const allO = (currentValue) => currentValue === "O";
    const draw = (currentValue) => currentValue !== "";
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
      document.querySelector("#winMsg").textContent =
        "Player One Wins! Would you like to play again?";
      document.querySelector(".winBtn").classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      document.querySelector(
        "#player1Score"
      ).textContent = `${playerOne.playerScore}`;
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
      document.querySelector("#winMsg").textContent =
        "Player Two Wins! Would you like to play again?";
      document.querySelector(".winBtn").classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerTwo.playerScore += 1;
      document.querySelector(
        "#player2Score"
      ).textContent = `${playerTwo.playerScore}`;
      return;
    } else if (check1.every(draw) && check2.every(draw) && check3.every(draw)) {
      document.querySelector("#winMsg").textContent =
        "It's a draw! Would you like to play again?";
      document.querySelector(".winBtn").classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      playerTwo.playerScore += 1;
      document.querySelector(
        "#player1Score"
      ).textContent = `${playerOne.playerScore}`;
      document.querySelector(
        "#player2Score"
      ).textContent = `${playerTwo.playerScore}`;
      return;
    }
    return;
  };

  return { newGame, checkWin };
})();

// Event Listeners
newGameBtn.addEventListener("click", () => {
  document.querySelector("#restartGame").classList.remove("hidden");
  gameBoard.clearBoard();
  document.querySelector("#winMsg").textContent = "";
  playerOne.playerScore = 0;
  playerTwo.playerScore = 0;
  document.querySelector(
    "#player1Score"
  ).textContent = `${playerOne.playerScore}`;
  document.querySelector(
    "#player2Score"
  ).textContent = `${playerTwo.playerScore}`;
  gameController.newGame(playerOne, playerTwo);
});

document.querySelector("#playYes").addEventListener("click", () => {
  document.querySelector(".winBtn").classList.add("hidden");
  document.querySelector("#winMsg").textContent = "";
  gameBoard.clearBoard();
  gameController.newGame(playerOne, playerTwo);
});

document.querySelector("#playNo").addEventListener("click", () => {
  document.querySelector(".winBtn").classList.add("hidden");
  document.querySelector("#restartGame").classList.add("hidden");
  gameBoard.clearBoard();
  document.querySelector("#winMsg").textContent = "";
  playerOne.playerScore = 0;
  playerTwo.playerScore = 0;
  document.querySelector(
    "#player1Score"
  ).textContent = `${playerOne.playerScore}`;
  document.querySelector(
    "#player2Score"
  ).textContent = `${playerTwo.playerScore}`;
});

document.querySelector("#restartGame").addEventListener("click", () => {
  gameBoard.clearBoard();
});

// To do
// TIDY CODE
// STYLE CSS
// ADD FUNCTIONALITY TO CHANGE NAME JS
// ADD VS COMPUTER AI PLAY
