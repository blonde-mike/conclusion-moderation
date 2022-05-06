export function findLocalItems (query) {
    var i, results = [];
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          let value = JSON.parse(localStorage.getItem(i));
          results.push({key:i,val:value});
        }
      }
    }
    return results;
  }

export const sleepUntil = async (f, timeoutMs) => {
    return new Promise((resolve, reject) => {
        const timeWas = new Date();
        const wait = setInterval(function() {
        if (f()) {
            console.log("resolved after", new Date() - timeWas, "ms");
            clearInterval(wait);
            resolve();
        } else if (new Date() - timeWas > timeoutMs) { // Timeout
            console.log("rejected after", new Date() - timeWas, "ms");
            clearInterval(wait);
            reject();
        }
        }, 20);
    });
}