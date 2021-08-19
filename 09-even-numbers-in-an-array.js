// https://www.codewars.com/kata/5a431c0de1ce0ec33a00000c/javascript

function evenNumbers(numbers, outputLength) {
  const lastEvenNumbers = [];

  for (let index = numbers.length - 1; index >= 0 && lastEvenNumbers.length < outputLength ; index--) {
      if (!(numbers[index] % 2)) { /* isEven */
          lastEvenNumbers.unshift(numbers[index]);
      }
  }

  return lastEvenNumbers;
}