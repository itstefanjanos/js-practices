// https://www.codewars.com/kata/59f4a0acbee84576800000af/javascript

function calculateNumberOfCommonPositions(firstWord, secondWord) {
    let numberOfCommonPositions = 0;
    for (
        let characterIndexSelectedForCompare = 0; 
        characterIndexSelectedForCompare < firstWord.length; 
        characterIndexSelectedForCompare++
    ) {
        if (
            firstWord[characterIndexSelectedForCompare] == 
            secondWord[characterIndexSelectedForCompare]
        ) {
            numberOfCommonPositions++;
        }
    }
    return numberOfCommonPositions;
}

function posAverage(wordListString) {
    const words = wordListString.split(', ');
    const combinationsOfWords = (words.length * (words.length - 1))/2;
    let numberOfCommonPositions = 0;
    
    for (
        let firstWordIndex = 0; 
        firstWordIndex < words.length - 1;
        firstWordIndex++
    ) {
        for (
            let secondWordIndex = firstWordIndex + 1; 
            secondWordIndex < words.length; 
            secondWordIndex++
        ) {
            numberOfCommonPositions += calculateNumberOfCommonPositions(
            words[firstWordIndex], 
            words[secondWordIndex]
            );
      }
    }
    return numberOfCommonPositions * 100 / (combinationsOfWords * words[0].length);
}