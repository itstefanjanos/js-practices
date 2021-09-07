// https://www.codewars.com/kata/5613d06cee1e7da6d5000055/javascript

let testedNumberIsPrime = {};
function isPrime(number) {
    if (number < 2) {
        return false;
    }
    if (testedNumberIsPrime[number] != undefined) {
        return testedNumberIsPrime[number];
    }
    testedNumberIsPrime[number] = true;
    for (let devider = 2; devider <= Math.ceil(Math.sqrt(number)); devider++) {
        if (!(number % devider) && number != devider) {
            testedNumberIsPrime[number] = false;
            break;
        }
    }
    return testedNumberIsPrime[number];
}
function step(gap, start_of_search, end_of_search) {
    for(let number = start_of_search; number <= end_of_search - gap; number++) {
        if (isPrime(number) && isPrime(number + gap)) {
            return [number, number + gap];
        }
    }
    return null;
}