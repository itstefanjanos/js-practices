// https://www.codewars.com/kata/54e6533c92449cc251001667/javascript

const uniqueInOrder = 
    iterable => Array.from(iterable)
        .filter((character, index, array) => index < 1 || character !== array[index - 1]);