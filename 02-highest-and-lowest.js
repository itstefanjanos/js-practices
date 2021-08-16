// https://www.codewars.com/kata/554b4ac871d6813a03000035/javascript

function highAndLow(numbers){
    const sortedNumbers = numbers.split(' ').map(numberString => +numberString)
        .sort((firstNumber, secondNumber) => firstNumber - secondNumber);
    return `${sortedNumbers[sortedNumbers.length - 1]} ${sortedNumbers[0]}`
}