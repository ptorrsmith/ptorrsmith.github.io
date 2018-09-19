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
        isMine: (Math.random() > 0.7),
        // isMine: ((i + 1) % 2 == 0 && (j + 1) % 3 == 0),
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
  var size = 5;
  loadBoard(size);
  loadSurroundingMinesCount();

  // start listening for mouse clicks
  // is this anywhere on the page?
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);  // had this as dblclick


  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function peek() {
  //
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)

  // we can only win if all cells are either
  //  a mine and marked, or
  //  a non-mine and not hidden



  // will look at every cell.
  // if every cell, if it's a mine but it's not marked, then not won yet
  // and if it's a cell that's hidden then not won yet

  var cells = board.cells;
  for (var i = 0; i < cells.length; i++) {

    var cell = cells[i];
    // if cell is a mine and it is marked, good, else return false  
    if ((cell.isMine && cell.isMarked) || (!cell.isMine && !cell.hidden)) {
      // all good, carry on
      continue;     // carry on to check next cell
    } else {
      return false; // or just return ??
    }

  }

  lib.displayMessage('You win!')
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

