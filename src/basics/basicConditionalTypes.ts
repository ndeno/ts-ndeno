import fetch from 'node-fetch';

/**
 * Conditional types might be the single most unique feature in all of TypeScript. At a
 * high level, conditional types let you say, “Declare a type T that depends on types U
 * and V; if U <: V, then assign T to A, and otherwise, assign T to B.”
 */

// In code it might look like this:
type IsString<T> = T extends string ? true : false;
type A = IsString<string>; // true
type B = IsString<number>; // false

const hello: IsString<string> = true;

interface PokemonResults {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

function fetchPokemon(url: string, cb: (data: PokemonResults) => void): void;
function fetchPokemon(url: string): Promise<PokemonResults>;
function fetchPokemon(
  url: string,
  cb?: (data: PokemonResults) => void
): unknown {
  if (cb) {
    fetch(url)
      .then((data) => data.json())
      .then((data) => cb(data as PokemonResults));
    return;
  } else {
    return fetch(url).then((data) => data.json());
  }
}

fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10', (data) => {
  data.results.forEach(({ name }) => console.log(name));
});

(async function () {
  const data = await fetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10');
  data.results.forEach(({ name }) => console.log(name));
})();
