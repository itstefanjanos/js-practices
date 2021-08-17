// https://www.codewars.com/kata/5a431c0de1ce0ec33a00000c/javascript

function evenNumbers(array, number) {
    return array.reduceRight((currentEvenNumbers, currentNumber) => {
      if (currentEvenNumbers.length == number) {
        return currentEvenNumbers;
      }
      if (!(currentNumber % 2)) { /* isEven */
        currentEvenNumbers.unshift(currentNumber);
      }
      return currentEvenNumbers;
    }, []);
}