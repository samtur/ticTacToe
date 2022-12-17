// Query Selectors
const newGameBtn = document.querySelector("#newGame");

// Factory Functions and Modules
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const gameController = (() => {
  let newGame = () => {};
  let checkTurn = () => {};
  let restartGame = () => {};
  return { newGame, checkTurn, restartGame };
})();

const player = (name) => {
  let playerName = name;
  let playerScore = 0;
  return { playerName, playerScore };
};

// Event Listeners
newGameBtn.addEventListener("click", (e) => {
  console.log("Got me!");
});
