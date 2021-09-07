(() => {
    Array.prototype.ownMap = function(callback) {
        const newItems = [];
        for (let index = 0; index < this.length; index++) {
            newItems.push(callback(this[index], index, this));
        }
        return newItems;
    };

    console.log([1,2].ownMap((item, index) => item * item));
})();