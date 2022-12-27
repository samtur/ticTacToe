// Query Selectors
const newGameBtn = document.querySelector("#newGame");
const boardSquares = document.querySelectorAll(".boardSq");
const player1Name = document.querySelector("#player1Name");
const player1Score = document.querySelector("#player1Score");
const player2Name = document.querySelector("#player2Name");
const player2Score = document.querySelector("#player2Score");
const winMsg = document.querySelector("#winMsg");
const winBtn = document.querySelector(".winBtn");
const restartBtn = document.querySelector("#restartGame");
const playerContainer = document.querySelector(".playerContainer");
const pveBtn = document.querySelector("#pve");
const pvpBtn = document.querySelector("#pvp");
const playYes = document.querySelector("#playYes");
const playNo = document.querySelector("#playNo");

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
  let pve = false;
  return { playerName, playerScore, turn, icon, pve };
};

const playerOne = player("Player One", 0, "X");
const playerTwo = player("Player Two", 0, "O");

player1Name.value = `${playerOne.playerName}`;
player1Score.textContent = `${playerOne.playerScore}`;
player2Name.value = `${playerTwo.playerName}`;
player2Score.textContent = `${playerTwo.playerScore}`;

// Game Controller Module
const gameController = (() => {
  let newGame = (playerOne, playerTwo) => {
    playerOne.turn = true;
    playerTwo.turn = false;
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
      this.removeEventListener("click", tracker);
      checkWin(gameBoard.board, tracker, playerOne, playerTwo);
    };
    boardSquares.forEach((box) => box.addEventListener("click", tracker));
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
      winMsg.textContent = `${playerOne.playerName} wins! Would you like to play again?`;
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      player1Score.textContent = `${playerOne.playerScore}`;
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
      winMsg.textContent = `${playerTwo.playerName} wins! Would you like to play again?`;
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerTwo.playerScore += 1;
      player2Score.textContent = `${playerTwo.playerScore}`;
    } else if (check1.every(draw) && check2.every(draw) && check3.every(draw)) {
      winMsg.textContent = "It's a draw! Would you like to play again?";
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      playerTwo.playerScore += 1;
      player1Score.textContent = `${playerOne.playerScore}`;
      player2Score.textContent = `${playerTwo.playerScore}`;
    }
  };

  let checkWinPve1 = (board, track, playerOne, playerTwo) => {
    const allX = (currentValue) => currentValue === "X";
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
      winMsg.textContent = `${playerOne.playerName} wins! Would you like to play again?`;
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      player1Score.textContent = `${playerOne.playerScore}`;
      return;
    } else if (check1.every(draw) && check2.every(draw) && check3.every(draw)) {
      winMsg.textContent = "It's a draw! Would you like to play again?";
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      playerTwo.playerScore += 1;
      player1Score.textContent = `${playerOne.playerScore}`;
      player2Score.textContent = `${playerTwo.playerScore}`;
      return;
    } else {
      gameController.pveturn2(track);
    }
  };

  let checkWinPve2 = (board, track, playerOne, playerTwo) => {
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
      check1.every(allO) ||
      check2.every(allO) ||
      check3.every(allO) ||
      check4.every(allO) ||
      check5.every(allO) ||
      check6.every(allO) ||
      check7.every(allO) ||
      check8.every(allO)
    ) {
      winMsg.textContent = `${playerTwo.playerName} wins! Would you like to play again?`;
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerTwo.playerScore += 1;
      player2Score.textContent = `${playerTwo.playerScore}`;
      return;
    } else if (check1.every(draw) && check2.every(draw) && check3.every(draw)) {
      winMsg.textContent = "It's a draw! Would you like to play again?";
      winBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
      newGameBtn.classList.remove("hidden");
      boardSquares.forEach((box) => box.removeEventListener("click", track));
      playerOne.playerScore += 1;
      playerTwo.playerScore += 1;
      player1Score.textContent = `${playerOne.playerScore}`;
      player2Score.textContent = `${playerTwo.playerScore}`;
      return;
    }
  };

  let pveGame = (playerOne, playerTwo) => {
    const tracker = function tracker() {
      this.textContent = "X";
      gameBoard.board[this.dataset.index] = "X";
      this.removeEventListener("click", tracker);
      checkWinPve1(gameBoard.board, tracker, playerOne, playerTwo);
    };
    boardSquares.forEach((box) => box.addEventListener("click", tracker));
  };

  let pveturn2 = function play2(track) {
    console.log(track);
    let random = Math.floor(Math.random() * 9);
    while (gameBoard.board[random] !== "") {
      random = Math.floor(Math.random() * 9);
    }
    gameBoard.board[random] = "O";
    document.querySelector(`#sq${random}`).textContent = "O";
    document.querySelector(`#sq${random}`).removeEventListener("click", track);
    checkWinPve2(gameBoard.board, track, playerOne, playerTwo);
  };

  return { newGame, checkWin, pveGame, pveturn2 };
})();

// Event Listeners
newGameBtn.addEventListener("click", () => {
  newGameBtn.classList.add("hidden");
  pvpBtn.classList.remove("hidden");
  pveBtn.classList.remove("hidden");
  boardSquares.forEach((box) => box.classList.add("sq"));
  gameBoard.clearBoard();
  winMsg.textContent = "";
});

pvpBtn.addEventListener("click", () => {
  pvpBtn.classList.add("hidden");
  pveBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  playerOne.playerScore = 0;
  playerTwo.playerScore = 0;
  player1Score.textContent = `${playerOne.playerScore}`;
  player2Score.textContent = `${playerTwo.playerScore}`;
  playerOne.playerName = "Player One";
  player1Name.value = `${playerOne.playerName}`;
  playerTwo.playerName = "Player Two";
  player2Name.value = `${playerTwo.playerName}`;
  gameController.newGame(playerOne, playerTwo);
});

pveBtn.addEventListener("click", () => {
  pvpBtn.classList.add("hidden");
  pveBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  playerOne.playerScore = 0;
  playerTwo.playerScore = 0;
  player1Score.textContent = `${playerOne.playerScore}`;
  player2Score.textContent = `${playerTwo.playerScore}`;
  playerOne.playerName = "Player One";
  player1Name.value = `${playerOne.playerName}`;
  playerTwo.playerName = "Computer";
  player2Name.value = `${playerTwo.playerName}`;
  playerOne.pve = true;
  gameController.pveGame(playerOne, playerTwo);
});

playYes.addEventListener("click", () => {
  winBtn.classList.add("hidden");
  winMsg.textContent = "";
  restartBtn.classList.remove("hidden");
  newGameBtn.classList.add("hidden");
  gameBoard.clearBoard();
  if (playerOne.pve === false) {
    gameController.newGame(playerOne, playerTwo);
  } else {
    gameController.pveGame(playerOne, playerTwo);
  }
});

playNo.addEventListener("click", () => {
  winBtn.classList.add("hidden");
  boardSquares.forEach((box) => box.classList.remove("sq"));
  gameBoard.clearBoard();
  winMsg.textContent = "";
  playerOne.playerScore = 0;
  playerTwo.playerScore = 0;
  player1Score.textContent = `${playerOne.playerScore}`;
  player2Score.textContent = `${playerTwo.playerScore}`;
  playerOne.playerName = "Player One";
  player1Name.value = `${playerOne.playerName}`;
  playerTwo.playerName = "Player Two";
  player2Name.value = `${playerTwo.playerName}`;
});

restartBtn.addEventListener("click", () => gameBoard.clearBoard());

player1Name.addEventListener(
  "input",
  () => (playerOne.playerName = player1Name.value)
);

player2Name.addEventListener(
  "input",
  () => (playerTwo.playerName = player2Name.value)
);

// To do
// TIDY CODE
// FINISH STYLING
// CONSIDER MAKING SMARTER AI
