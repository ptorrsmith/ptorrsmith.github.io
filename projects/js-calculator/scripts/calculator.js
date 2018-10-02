var currentValue = "";
var currentTotal = 0;
var nextOperation = "+";

document.addEventListener("DOMContentLoaded", startCalc);

function startCalc() {

    addNumberButtonEvents();

    addDecimalButtonEvent();

    addPercentButtonEvent();

    addOperationButtonEvent();

    addEqualsButtonEvent();

    addClearButtonEvent();
}

// Add event listeners


function addNumberButtonEvents() {
    // get array of number elements
    let numbersButtonList = Array.from(document.getElementsByClassName("digit"));
    numbersButtonList.forEach(function (btn) {
        btn.addEventListener('click', appendDigit);
    }
    )
}


function addDecimalButtonEvent() {
    let decimalButton = document.getElementById('buttonDecimal');
    decimalButton.addEventListener('click', addDecimal);
}

function addPercentButtonEvent() {
    let percentButton = document.getElementById('buttonPercent');
    percentButton.addEventListener('click', invokePercent);
}

function addOperationButtonEvent() {
    // get array of number elements
    let operationButtonList = Array.from(document.getElementsByClassName("operation"));
    operationButtonList.forEach(function (btn) {
        btn.addEventListener('click', setNextOperation);
    }
    )
}

function addEqualsButtonEvent() {
    let equalButton = document.getElementById('buttonEquals');
    equalButton.addEventListener('click', equate);
}


function addClearButtonEvent() {
    let clearButton = document.getElementById('buttonClear');
    clearButton.addEventListener('click', clearValues)
}



// main logic functions

function updateDisplay(displayValue) {
    document.getElementById("displayValue").innerHTML = displayValue;
}

function appendDigit(evt) {
    let newDigit = evt.target.attributes["data-id"].value;

    currentValue += newDigit;

    updateDisplay(currentValue);
}

function addDecimal() {
    // ensure not already a decimal in current number string
    if (currentValue.indexOf('.') < 0) {
        // add "." to currentValue string
        currentValue += ".";
        updateDisplay(currentValue);
    }
}

function equate() {

  // Check currentValue is able to be a number
    if (!isNaN(parseFloat(currentValue))) {
         switch (nextOperation){
            case "*":{
                currentTotal *= parseFloat(currentValue);
                break;
            }
            case "/":{
                currentTotal /= parseFloat(currentValue);
                break;
            }
            case "-":{
                currentTotal -= parseFloat(currentValue);
                break;
            }
            case "+":{
                currentTotal += parseFloat(currentValue);
                break;
            }
        }
    }

    currentValue = "";

    //may not need to ensure current total passed to displayOutput is a string
    //displayOutput = "" + currentTotal;

    updateDisplay(currentTotal);
}


function invokePercent() {
    // check if currentvalue is NaN ("" or ".")
    // if so, 
    if (!isNaN(parseFloat(currentValue))) {
        currentValue = parseFloat(currentValue) / 100 * currentTotal;
        updateDisplay(currentValue);
    }
}

function setNextOperation(evt) {
    equate();
    nextOperation = evt.target.attributes["data-id"].value;
}

function clearValues() {
    currentTotal = 0;
    currentValue = "";
    nextOperation = "+";
    updateDisplay(0);
}


