(() => {
    Function.prototype.ownBind = function(that, ...args) {
        return (...moreArgs) => {
            this.apply(that, [...args, ...moreArgs]);
        };
    };
    const testArray = [];
    const test = Array.prototype.push.ownBind(testArray, 1, 2, 3, 4);
    test(3);
    console.log(testArray);
})();