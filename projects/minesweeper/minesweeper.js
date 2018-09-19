document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
  ]
}

function loadBoard(size) {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var cell = {
        row: i,
        col: j,
        isMine: ((i + 1) % 2 == 0 || (j + 1) % 1.5 == 0),
        hidden: true
      }
      board.cells.push(cell);
    }
  }
}

function loadSurroundingMinesCount() {
  //loop through board cells array (array of cell objects)
  //For each cell, call CountSurroundingMines(cell)
  //Add that value to the surroundingMines: property of the cell object
  var cells = board.cells;
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    var surroundingMines = countSurroundingMines(cell);
    cell["surroundingMines"] = surroundingMines;
  }
}

function startGame() {
  // var size = prompt("Enter size 2-6", 6);
  var size = 6;
  loadBoard(size);
  loadSurroundingMinesCount();



  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var row = cell["row"];  // get property from object ["property"] notation
  var col = cell.col;     // get property from object .property notation
  var surroundingCells = getSurroundingCells(row, col); // returns array of all neighbouring cells
  // loop through the returned array of cell objects to count their isMine property
  var surroundingMinesCount = 0;
  for (var i = 0; i < surroundingCells.length; i++) {
    var cell = surroundingCells[i];
    if (cell["isMine"]) {
      surroundingMinesCount++;
    }
  }
  return surroundingMinesCount;
}

