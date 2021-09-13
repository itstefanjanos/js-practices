// https://www.codewars.com/kata/5420fc9bb5b2c7fd57000004/javascript

function highestRank(arr){
    return +Object.entries(arr.reduce((numbersCount, number) => {
      numbersCount[number] = numbersCount[number] !== undefined
        ? numbersCount[number] + 1
        : 1;
      return numbersCount;
  }, {})).sort(([firstNumber,firstCount],[secondNumber,secondCount]) => (secondCount - firstCount) || (secondNumber - firstNumber))[0][0];
  }