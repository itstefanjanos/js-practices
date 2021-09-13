// https://gitlab.com/moongoal/js-polyfill-object.fromentries/-/blob/master/index.js
if (!Object.fromEntries) {
    Object.defineProperty(Object, 'fromEntries', {
      value(entries) {
        if (!entries || !entries[Symbol.iterator]) { throw new Error('Object.fromEntries() requires a single iterable argument'); }
  
        const o = {};
  
        Object.keys(entries).forEach((key) => {
          const [k, v] = entries[key];
  
          o[k] = v;
        });
  
        return o;
      },
    });
}

// This Codewars kata use older version of node.js :(
// https://www.codewars.com/kata/5e8dd197c122f6001a8637ca/javascript

const removeDuplicateIds = (obj) => {
    const charSet = new Set();
    return Object.fromEntries(Object.entries(obj)
      .sort(
        ([firstKey], [secondKey]) => secondKey - firstKey)
      .map(([key, values]) => 
           [key,values.filter(value => 
                !(charSet.has(value) || !charSet.add(value)))])
      .sort(
        ([firstKey], [secondKey]) => firstKey - secondKey));
};

// test cases

console.log(removeDuplicateIds({
    "1": ["A", "B", "C"],
    "2": ["A", "B", "D", "A"],
}));

console.log(removeDuplicateIds({
    "1": ["C", "F", "G"],
    "2": ["A", "B", "C"],
    "3": ["A", "B", "D"],
}));

console.log(removeDuplicateIds({
    "1": ["A"],
    "2": ["A"],
    "3": ["A"],
}));
        
console.log(removeDuplicateIds({
    "432": ["A", "A", "B", "D"],
    "53": ["L", "G", "B", "C"],
    "236": ["L", "A", "X", "G", "H", "X"],
    "11": ["P", "R", "S", "D"],
}));