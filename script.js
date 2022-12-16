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
