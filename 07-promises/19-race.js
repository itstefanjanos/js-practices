function race(promises) {
    return new Promise((resolve_all, reject_all) => {
        const resolve_callback = function (result) {
            resolve_all(result);
        }
        
        const reject_callback = function (e) {
            reject_all(e);
        }
        promises.forEach((promise, index) => {
            promise.then(resolve_callback, reject_callback);
        })
    });
}

// test cases

race([new Promise((resolve, reject) => {
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

Promise.race([new Promise((resolve, reject) => { // compare with original implementation
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

race([new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('testError'));
    }, 1000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 4000);
})]).then(results => console.log(results)).catch(e => console.log(e));

Promise.race([new Promise((resolve, reject) => {  // compare with original implementation
    setTimeout(() => {
        reject(new Error('testError'));
    }, 1000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
}),new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 4000);
})]).then(results => console.log(results)).catch(e => console.log(e));