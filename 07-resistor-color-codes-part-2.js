// https://www.codewars.com/kata/5855777bb45c01bada0002ac/javascript

function encodeResistorColors(ohmsString) {
    const resitorColorCodes = {
        '-3': 'pink', '-2': 'silver', '-1': 'gold', 
        '0': 'black', '1': 'brown', '2': 'red', 
        '3': 'orange', '4': 'yellow', '5': 'green', 
        '6': 'blue', '7': 'violet', '8': 'gray', '9': 'white'};
    const exponentValuesOfUnitPrefix = {
        'm': -3, //milli
        '': 0,  //without unit prefix
        'k': 3, //kilo
        'M': 6 //mega
    };

    const preprcessedValueAndUnit = /(?<valueWithoutUnitPrefix>\d+(?:\.\d)?)(?<unitPrefix>[mkM]?) ohms?/
        .exec(ohmsString).groups;
    const exponentialValue = (+preprcessedValueAndUnit.valueWithoutUnitPrefix).toExponential(1); 
    const processedColorIndexes = /(?<firstIndex>\d)\.(?<secondIndex>\d)e(?<thirdIncreasedIndex>[+-]\d)/
        .exec(exponentialValue).groups;

    return `${
        resitorColorCodes[+processedColorIndexes.firstIndex]
        } ${ resitorColorCodes[+processedColorIndexes.secondIndex] 
        } ${ resitorColorCodes[+processedColorIndexes.thirdIncreasedIndex - 1 
        + exponentValuesOfUnitPrefix[preprcessedValueAndUnit.unitPrefix]]
        } gold`;
}