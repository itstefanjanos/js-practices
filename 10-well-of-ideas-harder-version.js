// https://www.codewars.com/kata/57f22b0f1b5432ff09001cab/javascript

function well(ideas){
    const numberOfGoodIdeas = ideas
        .reduce((currentCountOfNestedGoodIdeas, nestedIdeas) => 
            currentCountOfNestedGoodIdeas + nestedIdeas
                .reduce((currentCountOfGoodIdeas, idea) => 
                    currentCountOfGoodIdeas + ((''+idea).toUpperCase() === 'GOOD'),
                0), 
        0);
    return (numberOfGoodIdeas > 2) ? 'I smell a series!' :
      (numberOfGoodIdeas >= 1) ? 'Publish!' : 'Fail!';
}