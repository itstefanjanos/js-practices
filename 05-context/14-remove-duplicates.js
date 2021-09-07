(() => {
    Array.prototype.removeDuplicates = function() {
        return this.reduce((uniqueItems, item) => {
            if (!uniqueItems.includes(item)) {
                uniqueItems.push(item);
            }
            return uniqueItems;
        }, []);
    };

    console.log([1, 2, 2, 3, 2, 1, 4, 2, 4, 3, 5].removeDuplicates());
})();