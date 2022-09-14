let storedValues = [];
let workingValues = [];
let storedOperator = 0;

function addNums(arr) {
    const numArr = arr;
    return numArr.reduce((total, ele) => total += ele);
};

function subtractNums(arr) {
    const numArr = arr;
    return numArr.reduce((total, ele) => total -= ele);
};

function multiplyNums(arr) {
    const numArr = arr;
    return numArr.reduce((total, ele) => total *= ele);
};

function divideNums(arr) {
    const numArr = arr;
    return numArr.reduce((total, ele) => total /= ele);
};

// If storedValues is empty, it becomes equal to workingValues. Otherwise checks the value of storedOperator, pushes
// workingValue to StoredValue, and runs the appropriate fn.
function operate() {
    if (!storedValues[0]) {
        storedValues = workingValues;
    } else if (storedOperator === '+') {
        storedValues.push(workingValues[0]);
        storedValues = [addNums(storedValues)];
    } else if (storedOperator === '-') {
        storedValues.push(workingValues[0]);
        storedValues = [subtractNums(storedValues)];
    } else if (storedOperator === 'x') {
        storedValues.push(workingValues[0]);
        storedValues = [multiplyNums(storedValues)];
    } else if (storedOperator === '/') {
        storedValues.push(workingValues[0]);
        storedValues = [divideNums(storedValues)];
    };
};

const displayScreen = document.querySelector('#mainDisplay');
const previousScreen = document.querySelector('#previousDisplay');
const numButtons = document.querySelectorAll('.numButton');
numButtons.forEach(button => button.addEventListener('click', function(e) {
    displayScreen.innerText += `${button.innerText}`;
    workingValues.push(button.innerText);
    workingValues = [parseFloat(workingValues.join(''))];
}));

const operatorButtons = document.querySelectorAll('.operatorButton'); 
// On click, if workingValues is empty, does nothing. 
// Otherwise runs operate() and adds the button's innertext to displayScreen, changes the storedOperator to the 
// last one clicked, and empties workingValues.
operatorButtons.forEach(button => button.addEventListener('click', function(e) {
    if (typeof workingValues[0] !== 'number') return;
    operate();
    displayScreen.innerText += `${button.innerText}`;
    storedOperator = button.innerText;
    workingValues = [];
}));

const equalButton = document.querySelector('#equalsbtn');
equalButton.addEventListener('click', function(e) {
    if (typeof workingValues[0] !== 'number') return;
    displayScreen.innerText += `${this.innerText}`;
    operate();
    previousScreen.innerText = displayScreen.innerText;
    displayScreen.innerText = storedValues;
    workingValues = storedValues;
    storedValues = [];
});

const clearButton = document.querySelector('#clearbtn');
clearButton.addEventListener('click', function(e) {
    storedValues = [];
    workingValues = [];
    displayScreen.innerText = '';
    previousScreen.innerText = '';
});

const decimalButton = document.querySelector('#decimalbtn');
decimalButton.addEventListener('click', function(e) {
    if (workingValues.toString().includes('.')) return;
    displayScreen.innerText += `${this.innerText}`;
    workingValues.push(this.innerText);
});

const backspaceButton = document.querySelector('#backspacebtn');
