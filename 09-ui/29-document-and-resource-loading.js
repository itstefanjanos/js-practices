// https://javascript.info/onload-onerror

function preloadImages(sources, callback) {
    let waitForLoading = sources.length;
    sources.forEach(source => {
      const img = document.createElement('img');
      img.src = source;
      
      const load = () => {
        waitForLoading--;
        if (waitForLoading === 0) {
          callback();
        }
      };

      img.onload = load;
      img.onerror = load;
    });
  }