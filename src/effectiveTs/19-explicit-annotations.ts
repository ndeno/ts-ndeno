// Note: better practive to use type annotations for object literals
// helps with debugging
// flags issues where they're defined, not when they're used

type Product = {
  id: string;
  name: string;
  price: number;
};

// this is fine
function logProduct(product: Product) {
  const { id, name, price } = product;
  console.log(id, name, price);
}

// this is excessive and can be inferred
function explicitLogProduct(product: Product) {
  const { id, name, price }: { id: string; name: string; price: number } =
    product;
  console.log(id, name, price);
}

// There are a few situations where you may still want to specify a type even where it can
// be inferred.
// One is when you define an object literal:
const elmo: Product = {
  name: 'Tickle Me Elmo',
  id: '048188 627152',
  price: 28.99,
};

console.log(logProduct(elmo));

// the same is true for functions
// mixed return types - Promise<number> | number 
// the error now points to where the issue is defined, not where it's used 
const cache: { [ticker: string]: number } = {};
function getQuote(ticker: string): Promise<number> {
  if (ticker in cache) {
    return cache[ticker];
  }
  return fetch(`https://quotes.example.com/?q=${ticker}`)
    .then((response) => response.json())
    .then((quote) => {
      cache[ticker] = quote;
      return quote;
    });
}

getQuote('MSFT').then(() => console.log('done'))
