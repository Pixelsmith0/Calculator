let evalArray = []; //Stores equation to be evaluated

function isCharNum(c) { //Returns true if a value is a number
    if (c >= '0' && c <= '9') {
        return true;
    } else if (typeof c === 'number') {
        return true;
    } else return false;
};

function joinNums(arr) { //Concatenates adjacent numbers in an array. Required to run other eval functions incl. joinDecimals
    for (let i = 0; i <= arr.length; i++) {
        if (isCharNum(arr[i]) && isCharNum(arr[i + 1])) {
            arr[i] = parseFloat('' + arr[i] + arr[i + 1]);
            arr.splice(i + 1, 1);
            i--;
        };
    };    
    return arr;
};

function joinDecimals(arr) { //Concatenates decimal points with adjacent numbers. Requires joinNums to be run first
    let decIndex = arr.findIndex((ele) => ele === '.');
    while (decIndex !== -1) {
        if (arr[decIndex] === '.') {
            arr[decIndex - 1] = parseFloat('' + arr[decIndex - 1] + arr[decIndex] + arr[decIndex + 1]);
            arr.splice(decIndex, 2);
        };
        decIndex = arr.findIndex((ele) => ele === '.');
    };
    return arr;
};

function evalMultiplyDivide(arr) { //Evaluates the numbers to the left and right of the multi and div operators
    let multiDivIndex = arr.findIndex((ele) => ele === '/' || ele === 'x');
    while (multiDivIndex !== -1) {
        if (arr[multiDivIndex] === '/') {
            arr[multiDivIndex - 1] = (arr[multiDivIndex - 1] / arr[multiDivIndex + 1]);
            arr.splice(multiDivIndex, 2);
        } else if (arr[multiDivIndex] === 'x') {
            arr[multiDivIndex - 1] = (arr[multiDivIndex - 1] * arr[multiDivIndex + 1]);
            arr.splice(multiDivIndex, 2);
        };
        multiDivIndex = arr.findIndex((ele) => ele === '/' || ele === 'x');
    };
    return arr;
};

function evalAddSubtract(arr) { //Evaluates the numbers to the left and right of the add and subtract operators
    let addSubtractIndex = arr.findIndex((ele) => ele === '+' || ele === '-');
    while (arr.length > 1) {
        if (arr[addSubtractIndex] === '+') {
            arr[addSubtractIndex - 1] = (arr[addSubtractIndex - 1] + arr[addSubtractIndex + 1]);
            arr.splice(addSubtractIndex, 2);
        } else if (arr[addSubtractIndex] === '-') {
            arr[addSubtractIndex - 1] = (arr[addSubtractIndex - 1] - arr[addSubtractIndex + 1]);
            arr.splice(addSubtractIndex, 2);
        };
    };    
    return arr;
};

function evalEquation(evalArray) {
    joinNums(evalArray);
    joinDecimals(evalArray);
    evalMultiplyDivide(evalArray);
    evalAddSubtract(evalArray);
    return evalArray;
};

function checkIfNerd() { //Prevents the user from dividing by 0. Called on every button input;
    if (displayScreen.innerText.includes('/ 0')) { 
        clearAll();
        displayScreen.innerText = 'nice try nerd'
        return true;
    } else if (displayScreen.innerText === 'nice try nerd') return true;
};

const displayScreen = document.querySelector('#mainDisplay');
const previousScreen = document.querySelector('#previousDisplay');
const numButtons = document.querySelectorAll('.numButton');
numButtons.forEach(button => button.addEventListener('click', function(e) {
    if (checkIfNerd()) return;
    //Display - Checks the value at the last index of evalArray. Adds no whitespace if number or decimal, or does add whitespace if operator 
    if (typeof evalArray[evalArray.length - 1] === 'number' || evalArray[evalArray.length - 1] === '.') { 
        displayScreen.innerText += button.innerText;
    } else {displayScreen.innerText += ` ${button.innerText}`};
    evalArray.push(parseFloat(button.innerText)); //Pushes the pressed number into the evalArray
}));

const operatorButtons = document.querySelectorAll('.operatorButton'); 
operatorButtons.forEach(button => button.addEventListener('click', function(e) {
    if (checkIfNerd()) return;
    if (typeof evalArray[evalArray.length - 1] !== 'number') return; //Wont add operators if last index is not a number
    displayScreen.innerText += ` ${button.innerText}`; // Display - Adds whitespace and then operator to display
    evalArray.push(button.innerText); //Pushes the pressed operator into the evalArray
}));

//Converts a value to an array. Used to convert the final answer back into an array after pressing "=" for backspace functionality 
function convertValueToArray(arr) {
    arr = arr.toString();
    arr = Array.from(arr);
    for (i = 0; i <= arr.length; i++) {
        if (isCharNum(arr[i])) {
            arr[i] = parseFloat(arr[i]);
        };
    };
    return arr;
}; 

const equalButton = document.querySelector('#equalsbtn');
equalButton.addEventListener('click', function(e) {
    if (typeof evalArray[0] !== 'number') return; //exits if last index is not a number
    if (checkIfNerd()) return;
    if (isCharNum(evalArray[evalArray.length - 1]) === false) return; //Exits if last index of evalArray is a string
    displayScreen.innerText += ` ${this.innerText}`; //Display - Adds whitespace then '=' to display
    previousScreen.innerText = displayScreen.innerText; //Display - equation transfers to 2nd display screen
    evalEquation(evalArray); //Evaluates equation, leaving evalArray with one index
    evalArray[0] = Math.round(evalArray[0] * 100) / 100; //Rounds up to nearest hundredth
    displayScreen.innerText = evalArray[0]; //Display - Main display shows the final sum
    evalArray = convertValueToArray(evalArray) //Converts evalArray's singlular index back into an array. ie evalArray [9.5] becomes evalArray [9, ".", 5] 
});

function clearAll() { //Empties everything
    evalArray = [];
    displayScreen.innerText = '';
    previousScreen.innerText = '';
};

const clearButton = document.querySelector('#clearbtn');
clearButton.addEventListener('click', function(e) {
    clearAll();
});

const decimalButton = document.querySelector('#decimalbtn');
decimalButton.addEventListener('click', function(e) {
    if (checkIfNerd()) return;
    if (evalArray[evalArray.length - 1] === '.') return; //prevents multiple decimal points in a row
    //Display - Adds "0." if the last element of evalArray is a string or empty. Otherwise adds "."
    if (!evalArray[0] || typeof evalArray[evalArray.length - 1] === 'string') {
        displayScreen.innerText += ` 0${this.innerText}`;
    } else {displayScreen.innerText += `${this.innerText}`};
    //If the last element of evalArray is a number, pushes "." Otherwise if evalArray is empty or the last element is a string, pushes 0 then pushes "."
    if (isCharNum(evalArray[evalArray.length - 1])) {
        evalArray.push(this.innerText);
    } else if (!evalArray[0] || typeof evalArray[evalArray.length - 1] === 'string') {
        evalArray.push(0);
        evalArray.push(this.innerText);
    };
});

function backspaceUpdateDisplay() { 
// Display - removes characters from the main display when the backspace button is used. 
// Will remove two chars if last two chars are " 0." ie "...+ .0" 
    let displayLength = displayScreen.innerText.length;
    if (displayScreen.innerText.slice(displayLength - 3, displayLength) === ' 0.') {
        displayScreen.innerText = displayScreen.innerText.slice(0, displayLength - 2);
    } else (displayScreen.innerText = displayScreen.innerText.slice(0, displayLength - 1));
};

const backspaceButton = document.querySelector('#backspacebtn');
//Clears everything if the user deletes the last remaining number after using "=". Otherwise updates display and pops the last value off evalArray 
backspaceButton.addEventListener('click', function(e) {
    if (checkIfNerd()) return;
    if (previousScreen.innerText !== '' && evalArray.length === 1) {
        clearAll();
    } else {
        backspaceUpdateDisplay();
        evalArray.pop();
    };
});