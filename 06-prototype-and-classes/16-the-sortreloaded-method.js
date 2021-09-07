// https://www.codewars.com/kata/5610a8eeb9a84d624b000005/javascript

Array.prototype.sortReloaded = function(dir = 'asc') {
    if (!['asc', 'desc'].includes(dir)) {
        return false;
    }
    return [...this].sort((firstComperable, secondComperable) => 
                     dir === 'asc'
                        ? firstComperable - secondComperable
                        : secondComperable - firstComperable);
  }