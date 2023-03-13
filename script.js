const gameStatus = document.querySelector("#gameStatus");
const gameCells = document.querySelectorAll(".game_cell");
const restartBtn = document.querySelector("#restartBtn");

let currentPlayer = "X";
let isGameActive = false;

// create placeholder for X and O character for every gameCell (row/column is 3X3)
let board = [
  "", "", "", 
  "", "", "", 
  "", "", "",
];

// Store the indexes of the three winning positions on the board
  /*
  indexes within the board
  [0] [1] [2]
  [3] [4] [5]
  [6] [7] [8]
  */
const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

initializeGame();

function initializeGame(){
  isGameActive = true;

  gameCells.forEach(gameCell => {
    gameCell.addEventListener("click", cellClicked)
  })

  restartBtn.addEventListener("click", restartGame);

  gameStatus.textContent = `${currentPlayer}'s turn`;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  // check if a gameCell is not empty or game is not active.
  if(board[cellIndex] != "" || !isGameActive){
    return; // do nothing
  }

  // else update the cell
  updateCell(this, cellIndex);

  // check winner
  checkWinner();
}

function updateCell(cell, index){
  // update the cell placeholder on the board with currentPlayer value
  board[index] = currentPlayer;

  // display the currentPlayer value on the gameCell clicked
  cell.textContent = currentPlayer;
}

function changePayer(){
  currentPlayer = (currentPlayer === "X") ? "O" : "X";

  gameStatus.textContent = `${currentPlayer}'s turn`; 
}

function checkWinner(){
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++){
    // iterate and store each nested array in a variable
    const winCondition = winningConditions[i];

    // stores all first element of nested array within winningConditions checked with board placeholder
    const cellA = board[winCondition[0]];

    // stores all second element of nested array within winningConditions checked with board placeholder
    const cellB = board[winCondition[1]];

    // stores all third element of nested array within winningConditions checked with board placeholder
    const cellC = board[winCondition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB  == cellC) {
      roundWon = true;
      break;
    }
  }

  if(roundWon){
    gameStatus.textContent = `${currentPlayer} won!`;
    gameStatus.style.color = "green";
    isGameActive = false;
  } 
  else if(!board.includes("")){
    gameStatus.textContent = `Draw!`;
    isGameActive = false;
  } 
  else{
    changePayer();
  }
}

function restartGame(){
  currentPlayer = "X";
  gameStatus.textContent = `${currentPlayer}'s turn`;
  gameStatus.style.color = "#212121";
  board = [
    "", "", "",
    "", "", "",
    "", "", "",
  ];
  gameCells.forEach(gameCell => gameCell.textContent = "");
  isGameActive = true;
}