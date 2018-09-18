// Don't change or delete this line! It waits until the DOM has loaded, then calls 
// the start function. More info: 
// https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
document.addEventListener('DOMContentLoaded', start)


/*

Objective:
  * right click a dot it goes green
  * left click a dot it goes blue
  * double-click and it will hide, or become visible again (assume with same colour?)
  * * dots should not lose their space, just become invisible (but still clickable)
  * the colour counters keep count of their dots

*/

function start () {
  
  // find all the elements with class=="board"
  // select the first one [0]
  // return the collection of child elements, being all the dot divs 0-8
  // then call the bindEventListeners function with the collection as input   
   bindEventListeners(document.getElementsByClassName('board')[0].children)
}

// receive the collection of elements as dots[]
function bindEventListeners (dots) {
  for (var i = 0; i < dots.length; i++) {
    // BIND YOUR EVENT LISTENERS HERE
    // The first one is provided for you

    // 'contextmenu' is the righ-click mouse event
    dots[i].addEventListener('contextmenu', makeGreen);
    dots[i].addEventListener('click', makeBlue);
    dots[i].addEventListener('dblclick', hide);
  }
}

function makeGreen (evt) {
  // override / stop the default right-click mouse event behaviours (the context menu)
  evt.preventDefault();
  evt.target.classList.toggle('green');
  // evt.target.classList.remove('blue');
  // evt.target.classList.remove('hide');
  updateCounts();
}

// CREATE FUNCTION makeBlue HERE

function makeBlue (evt) {
  // notice this doesn't care what event is received, as long as it has a target element property / object
  evt.target.classList.toggle('blue');
  // trigger count update
  updateCounts();
}

// CREATE FUNCTION hide HERE

function hide (evt) {
  evt.preventDefault() // trying to stop the double click from selecting text-space and highlighting it in the browser
  evt.target.classList.toggle('invisible');
  // trigger count update of invisible counter
  updateCounts();
}



function updateCounts () {
  
   
  // our totals Object, with blue, green and invisible properties
  var totals = {
    blue: 0,
    green: 0,
    invisible: 0
  }
  
  // WRITE CODE HERE TO COUNT BLUE, GREEN, AND INVISIBLE DOTS

  // find all the dots.  divs within the div.board
//  var dots = document.body.classList('board')[0].children;
var dots = document.getElementsByClassName('board')[0].children;
for (i = 0; i < dots.length; i++) {
    var dot = dots[i]; // get the first div element as dot
    // if it's got the class
    if (dot.classList.contains("green")) {
      totals['green']++;
    }
    if (dot.classList.contains('blue')) {
      totals["blue"]++;
    }
    if (dot.classList.contains("invisible")) {
      totals["invisible"]++;
    }

    //switch () { case a: case b: break; default: break; }
    // switch (dot.classList) {
    //   case "green"
    // }
  }
  
  // loop through each of them to see what classes they have
  // set the counts appropriately



  // Once you've done the counting, this function will update the display
  displayTotals(totals)
}

function displayTotals (totals) {
  // get key from totals Object
  for (var key in totals) {
    document.getElementById(key + '-total').innerHTML = totals[key]
  }
}
