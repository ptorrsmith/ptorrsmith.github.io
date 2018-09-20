document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
  ],
  gameCount: 0,
  wonCount: 0,
  totalMines: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  gameOver: false
}

function loadBoard(size) {
  // need to reset board by:
  // clear out the cells
  document.getElementsByClassName('board')[0].innerHTML = "";

  // clear out any cells from a previous game
  board.cells = [];
  board.gameOver = false;

  // set the total mines back to 0;
  board.totalMines = 0;


  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      var cell = {
        row: i,
        col: j,
        isMine: (Math.random() > 0.7),
        hidden: true
      }
      board.cells.push(cell);
      if (cell.isMine) {
        board.totalMines++;
      }
    }
  }
  var mineCount = document.getElementsByClassName('mine-count')[0];
  mineCount.innerHTML = board.totalMines;
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
  var size = 4;
  loadBoard(size);
  loadSurroundingMinesCount();

  // start listening for mouse clicks
  // is this anywhere on the page?  Seems a bit overkill to add to "document"??
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);  // had this as dblclick, then context !!


  // Add event listener for the buttons.
  var btnTip1 = document.getElementById('tip-1-button');
  btnTip1.addEventListener('click', toggleTip);

  var btnRestart = document.getElementById('restart-1-button');
  btnRestart.addEventListener('click', restartGame);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function toggleTip(evt) {
  // if the tip is showing, then hide it and set button text to "Show Tip"
  // else show the tip and set button text to "Hide Tip"
  var tipSpan = document.getElementById('tip-1');
  var button = evt.target;

  //  tipSpan.classList.toggle('invisible');
  if (tipSpan.classList.contains("invisible")) {
    showTip(tipSpan, button)
    // tipSpan.classList.remove("invisible");
    // button.innerHTML = "Hide Tip";
  } else {
    hideTip(tipSpan, button);
    // tipSpan.classList.add("invisible");
    // button.innerHTML = "Show Tip";
  }
}

function hideTip(tip, button) {
  tip.classList.add("invisible");
  button.innerHTML = "Show Tip";
}

function showTip(tip, button) {
  tip.classList.remove("invisible");
  button.innerHTML = "Hide Tip";
}

function restartGame(evt) {

  // update the board's game count count by 1
  board.gameCount++;
  document.getElementById('total-games-count').innerHTML = board.gameCount;


  // start the game board set and load
  startGame();
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
  if (!board.gameOver) {
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
    board.gameOver = true;
    removeListeners()


    // increase the board's won count by 1
    board.wonCount++;
    document.getElementById('won-games-count').innerHTML = board.wonCount;
  }
  // alert("Games: " + board.gameCount + ".  Won: " + board.wonCount);

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

