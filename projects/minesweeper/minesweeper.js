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
        isMine: ((i)%2 == 0 && (j+0.5)%1.5 == 0),
        hidden: true
      }
      board.cells.push(cell);
    }
  }
}


function startGame() {
  // var size = prompt("Enter size 2-6", 6);
  var size = 6;
  loadBoard(size);

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
}

