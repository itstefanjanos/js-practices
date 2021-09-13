# js-practices

## 1. strings
1. [Returning Strings](https://www.codewars.com/kata/55a70521798b14d4750000a4/javascript)
2. [Highest and Lowest](https://www.codewars.com/kata/554b4ac871d6813a03000035/javascript)
3. [Positions Average](https://www.codewars.com/kata/59f4a0acbee84576800000af/javascript)

## 2. numbers
4. [Return Negative](https://www.codewars.com/kata/55685cd7ad70877c23000102/javascript)
5. [Thinkful - Number Drills: Congo warehouses](https://www.codewars.com/kata/5862e7c63f8628a126000e18/javascript)
6. [Steps in Primes](https://www.codewars.com/kata/5613d06cee1e7da6d5000055/javascript)

## 3. numbers-and-strings
7. [Resistor Color Codes, Part 2](https://www.codewars.com/kata/5855777bb45c01bada0002ac/javascript)

## 4. arrays

8. [Count of positives / sum of negatives](https://www.codewars.com/kata/576bb71bbbcf0951d5000044/javascript)
9. [Even numbers in an array](https://www.codewars.com/kata/5a431c0de1ce0ec33a00000c/javascript)
10. [Well of Ideas - Harder Version](https://www.codewars.com/kata/57f22b0f1b5432ff09001cab/javascript)
11. To create a function that returns a string with cities names, split by comma(‘,’). These cities should be written in the next order: from cities with the smallest population to the biggest. Also, only cities with a population of more than 200000 should be shown.
    ```
    const cities = [
        {
            city: 'New-York',
            population: 1000000,
        },
        {
            city: 'Kyiv',
            population: 230000,
        },
        {
            city: 'Warsaw',
            population: 195000,
        },
        {
            city: 'Paris',
            population: 403434,
        },
        {
            city: 'Budapest',
            population: 326154,
        }
    ]
    ```

## 5. context
12. implement your own bind function.
    You will already know how to do this using prototypes.
    So it should be used like this randomFunction.ownBind(obj, ...).
 
13. Also I want you to implement own map function, which behaves like array method 'map'.
    It can be used like this [1, 2].ownMap((item, index, arr) => {...do something})
 
14. And the last one is to create an array method removeDuplicates, which should work like this:
    [1, 2, 2, 3, 2, 1, 4, 2, 4, 3, 5].removeDuplicates() // returns a new array [1, 2, 3, 4, 5].

## 6. prototype-and-classes
15. [Refactored Greeting](https://www.codewars.com/kata/5121303128ef4b495f000001/javascript)
16. [The sortReloaded() method](https://www.codewars.com/kata/5610a8eeb9a84d624b000005/javascript)
17. [Build a Car](https://www.codewars.com/kata/5832d6e2565e120ae60000bb/javascript)

## 7. promises
18. The goal is to implement function “all” that will work in the same way original function Promise.all works. 
    The usage of original Promise.all for implementation is forbidden.

    Usage Example:
    ```
    all([promise1, promise2, promise3]).then((results) => {
        console.log(‘All promises resolved. Results are - ${JSON.stringify(results)}’);
    });
    ```
19. The goal is to implement function “race” that will work in the same way original function Promise.race works.
    The usage of original Promise. race for implementation is forbidden.

    Usage Example:
    ```
    race([promise1, promise2, promise3]).then((result) => {
        console.log(‘A promised resolved! Result is- ${JSON.stringify(result)}’);
    });
    ```

20. Create a function, which will get an unknown number of URLs and:

    a. Will make a request to each URL simultaneously and will return an array of responses. In case some request will return an error, the whole function should return an error. 

    ```[positiveResponse, positiveResponse] || error```

    b. Will make a request to each URL simultaneously and will return an array of responses. In case some request will return an error, this error should be written in the array of responses. 

    ```[positiveResponse, error]```

    x. Will make a request each by each only when the previous request is finished. Returns the last response or error

    Usage of Promise methods is allowed in this case.

 ## 8. ES6+
21. [Unique In Order](https://www.codewars.com/kata/54e6533c92449cc251001667/javascript)
22. [Duplicates. Duplicates Everywhere.](https://www.codewars.com/kata/5e8dd197c122f6001a8637ca/javascript)
23. [Highest Rank Number in an Array](https://www.codewars.com/kata/5420fc9bb5b2c7fd57000004/javascript)
24. ["this" is an other problem](https://www.codewars.com/kata/547f1a8d4a437abdf800055c/javascript)