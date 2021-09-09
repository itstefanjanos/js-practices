function fetchAll(...urls) {
    return Promise.all(urls.map(url => fetch(url).then(response => {
        return new Promise((resolve, reject) => {
            if (response.ok) {
                resolve(response);
            } else {
                reject(response);
            }
        });
    }))).then(response => response, error => error);
}

function fetchAllSettled(...urls) {
    return Promise.allSettled(urls.map(url => fetch(url).then(response => {
        return new Promise((resolve, reject) => {
            if (response.ok) {
                resolve(response);
            } else {
                reject(response);
            }
        });
    })));
}

function fetchQueue(...urls) {
    if (urls.length < 1) {
        return;
    }
    const urlQueue = urls.entries();
    let urlEntry = urlQueue.next();
    
    let resolve_all, reject_all;

    function getNext(resolved, value) {
        urlEntry = urlQueue.next();
        if (!urlEntry.done) {
            fetch(urlEntry.value[1]).then(value => getNext(true, value), value => getNext(falsed, value));
        } else {
            if (resolved) {
                resolve_all(value);
            } else {
                reject_all(value);
            }
        }
    }

    fetch(urlEntry.value[1]).then(value => getNext(true, value), value => getNext(false, value));

    return new Promise((resolve, reject) => {
        resolve_all = resolve;
        reject_all = reject;
    })
}

async function fetchQueueAsync(...urls) { 
    for (let index = 0; index < urls.length; index++) {
        if (index == urls.length - 1) {
            return await fetch(urls[index]);
        }
        await fetch(urls[index]);   
    }
}

// test cases

fetchAll("1.txt", "2.txt").then(response => console.log(response)).catch(error => console.log(error));
fetchAll("1.txt", "2.txt", '3.txt').then(response => console.log(response)).catch(error => console.log(error));

fetchAllSettled("1.txt", "2.txt").then(response => console.log(response)).catch(error => console.log(error));
fetchAllSettled("1.txt", "2.txt", '3.txt').then(response => console.log(response)).catch(error => console.log(error));

fetchQueue("1.txt", "2.txt").then(response => response.text()).then(text => console.log(text)).catch(error => console.log(error));
fetchQueue("1.txt", "2.txt", '3.txt').then(response => response.text()).then(text => console.log(text)).catch(error => console.log(error));

fetchQueueAsync("1.txt", "2.txt").then(response => response.text()).then(text => console.log(text)).catch(error => console.log(error));
fetchQueueAsync("1.txt", "2.txt", '3.txt').then(response => response.text()).then(text => console.log(text)).catch(error => console.log(error));
