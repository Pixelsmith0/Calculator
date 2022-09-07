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

function operate(...args) {
    const nums = args.filter(arg => typeof arg === 'number')
    if (args.includes('+')) {
        return addNums(nums);
    } else if (args.includes('-')) {
        return subtractNums(nums);
    } else if (args.includes('*')) {
        return multiplyNums(nums);
    } else if (args.includes('/')) {
        return divideNums(nums);
    };
};