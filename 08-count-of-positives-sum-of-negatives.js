// https://www.codewars.com/kata/576bb71bbbcf0951d5000044/javascript

function countPositivesSumNegatives(input) {
    return (!input?[]:input).reduce((currentCountOfPositivesAndSumOfNegatives, currentValue) => {
      if (currentCountOfPositivesAndSumOfNegatives[0] === undefined) {
        currentCountOfPositivesAndSumOfNegatives[0] = 0;
        currentCountOfPositivesAndSumOfNegatives[1] = 0;
      }
      if (currentValue > 0) {
        currentCountOfPositivesAndSumOfNegatives[0]++;
      } else if (currentValue < 0) {
        currentCountOfPositivesAndSumOfNegatives[1] += currentValue;
      }
      return currentCountOfPositivesAndSumOfNegatives;
    },[])
}