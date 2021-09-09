function all(promises) {
    return new Promise((resolve_all, reject_all) => {
        const results = [];
        const Resolve_callback = function (index) {
            this.index = index;
            return {
                index: this.index, 
                resolve: function (result) {
                    results[this.index] = result;
                    if (promises.length === results.length) {
                        resolve_all(results);
                    }
                }
            }
        }
        const reject_callback = function (e) {
            reject_all(e);
        }
        promises.forEach((promise, index) => {
            const resolve_callback = new Resolve_callback(index);
            promise.then(resolve_callback.resolve.bind(resolve_callback), reject_callback);
        })
    });
}

// test cases

all([new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 3000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 4000);
})]).then(results => console.log(results));

Promise.all([new Promise((resolve, reject) => { // compare with original implementation
    setTimeout(() => {
        resolve(1);
    }, 3000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 4000);
})]).then(results => console.log(results));

all([new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('testError'));
    }, 3000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 4000);
})]).then(results => console.log(results)).catch(e => console.log(e));

Promise.all([new Promise((resolve, reject) => {  // compare with original implementation
    setTimeout(() => {
        reject(new Error('testError'));
    }, 3000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 4000);
})]).then(results => console.log(results)).catch(e => console.log(e));