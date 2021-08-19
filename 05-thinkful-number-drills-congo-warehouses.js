// https://www.codewars.com/kata/5862e7c63f8628a126000e18/javascript

function boxCapacity(length, width, height) {
    return Math.floor(length * 3 / 4)
        * Math.floor(width * 3 / 4)
        * Math.floor(height * 3 / 4);
}