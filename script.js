let storedWorkingValues = [];
let workingValues = [];
let storedOperator = 0;
let numReferenceArr = [];
let sumReferenceArr = [];
let operatorReferenceArr = [];

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

function isNerd() {
    return displayScreen.innerText === 'nice try nerd'
};

function operate() {
    if (!storedWorkingValues[0]) {
        storedWorkingValues = workingValues;
    } else if (storedOperator === '+') {
        storedWorkingValues.push(workingValues[0]);
        storedWorkingValues = [addNums(storedWorkingValues)];
    } else if (storedOperator === '-') {
        storedWorkingValues.push(workingValues[0]);
        storedWorkingValues = [subtractNums(storedWorkingValues)];
    } else if (storedOperator === 'x') {
        storedWorkingValues.push(workingValues[0]);
        storedWorkingValues = [multiplyNums(storedWorkingValues)];
    } else if (storedOperator === '/') {
        storedWorkingValues.push(workingValues[0]);
        storedWorkingValues = [divideNums(storedWorkingValues)];
    };
    sumReferenceArr.push(storedWorkingValues[0]);
};

const displayScreen = document.querySelector('#mainDisplay');
const previousScreen = document.querySelector('#previousDisplay');
const numButtons = document.querySelectorAll('.numButton');
numButtons.forEach(button => button.addEventListener('click', function(e) {
    if (isNerd()) return;
    if (typeof workingValues[0] === 'number' || workingValues[0] === '.') {
        displayScreen.innerText += `${this.innerText}`;
    } else {
        displayScreen.innerText += ` ${this.innerText}`
    };
    workingValues.push(button.innerText);
    workingValues = [parseFloat(workingValues.join(''))];
}));

const operatorButtons = document.querySelectorAll('.operatorButton'); 
operatorButtons.forEach(button => button.addEventListener('click', function(e) {
    if (isNerd()) return;
    if (typeof workingValues[0] !== 'number') return;
    numReferenceArr.push(workingValues[0]);
    operate();
    displayScreen.innerText += ` ${this.innerText}`;
    storedOperator = button.innerText;
    operatorReferenceArr.push(button.innerText);
    workingValues = [];
}));

function clearReferences() {
    numReferenceArr = [];
    sumReferenceArr = [];
    operatorReferenceArr = [];
};

const equalButton = document.querySelector('#equalsbtn');
equalButton.addEventListener('click', function(e) {
    if (typeof workingValues[0] !== 'number') return;
    if (displayScreen.innerText.includes('/ 0')) {
        displayScreen.innerText = 'nice try nerd';
        return;
    } else if (isNerd()) return;
    displayScreen.innerText += ` ${this.innerText}`;
    numReferenceArr.push(workingValues[0]);
    operate();
    previousScreen.innerText = displayScreen.innerText;
    displayScreen.innerText = storedWorkingValues;
    workingValues = storedWorkingValues;
    storedWorkingValues = [];
    clearReferences();
});

function clearEverything() {
    storedWorkingValues = [];
    workingValues = [];
    displayScreen.innerText = '';
    previousScreen.innerText = '';
    clearReferences();
};

const clearButton = document.querySelector('#clearbtn');
clearButton.addEventListener('click', function(e) {
    storedWorkingValues = [];
    workingValues = [];
    displayScreen.innerText = '';
    previousScreen.innerText = '';
});

const decimalButton = document.querySelector('#decimalbtn');
decimalButton.addEventListener('click', function(e) {
    if (isNerd()) return;
    if (workingValues.toString().includes('.')) return;
    if (typeof workingValues[0] !== 'number') {
        displayScreen.innerText += ` 0${this.innerText}`;
    } else {
        displayScreen.innerText += `${this.innerText}`;
    };
    workingValues.push(this.innerText);
});

function updateDisplay() {
    if (displayScreen.innerText.length === 0) return;
    if (displayScreen.innerText.charAt(displayScreen.innerText.length - 2)  === '.') {
        displayScreen.innerText = displayScreen.innerText.slice(0, displayScreen.innerText.length - 2);
    } else {
        displayScreen.innerText = displayScreen.innerText.slice(0, displayScreen.innerText.length - 1);
    };
};

function updateWorkingValuesIfNum() {
    if (workingValues[1] === '.') {
        workingValues.pop();
        return;
    };
    workingValues[0] = workingValues[0].toString();
    if (workingValues[0].length === 1 && !numReferenceArr[0]) {
        workingValues = [];
    } else if (workingValues[0].length === 0) {
        workingValues[0] = numReferenceArr.pop();
        storedWorkingValues = [];
    } else if (workingValues[0].charAt(workingValues[0].length - 2) === '.') {
        workingValues[0] = parseFloat(workingValues[0].slice(0, workingValues[0].length - 2));
    } else if (workingValues[0].length === 1) {
        workingValues = [];
    } else {
        workingValues[0] = parseFloat(workingValues[0].slice(0, workingValues[0].length - 1));
    };
};

function updateWorkingValuesIfOp() {
    sumReferenceArr.pop();
    storedWorkingValues[0] = sumReferenceArr[sumReferenceArr.length - 1];
    workingValues[0] = numReferenceArr.pop();
};

function isCharNum(c) {
    return c >= '0' && c <= '9';
};

function updateOperator() {
    operatorReferenceArr.pop();
    storedOperator = operatorReferenceArr[operatorReferenceArr.length - 1];
};

const backspaceButton = document.querySelector('#backspacebtn');
backspaceButton.addEventListener('click', function(e) {
    if (isNerd()) return;
    if (isCharNum(displayScreen.innerText.charAt(displayScreen.innerText.length - 1))) {
        updateDisplay();
        updateWorkingValuesIfNum();
        return;
    } else if (isCharNum(displayScreen.innerText.charAt(displayScreen.innerText.length - 1)) === false) {
        updateDisplay();
        updateWorkingValuesIfOp();
        updateOperator();
    };
});