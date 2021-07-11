// Don't do this!

function fetchURL (url: string, func: (s: string) => void) {
  console.log(url)
  console.log('done')
}

// dont ever do this 
const _cache: { [url: string]: string } = {};

function fetchWithCache(url: string, callback: (text: string) => void) {
  if (url in _cache) {
    callback(_cache[url]);
  } else {
    fetchURL(url, (text) => {
      _cache[url] = text;
      callback(text);
    });
  }
}
