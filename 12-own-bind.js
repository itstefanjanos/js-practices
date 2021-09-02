(() => {
    Function.prototype.ownBind = function(that, ...args) {
        return () => {
            this.apply(that, args);
        };
    };
    const testArray = [];
    const test = Array.prototype.push.ownBind(testArray, 1, 2, 3, 4);
    test();
    console.log(testArray);
})();