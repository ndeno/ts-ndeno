export const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 'foo',
};

type FruitCounts = typeof fruitCounts;

type NewSingleFruitCounts = {
  [K in keyof FruitCounts]: {
    [K2 in K]: FruitCounts[K];
  };
}[keyof FruitCounts];

type DestructuredK = {
  [K in keyof FruitCounts]: Uppercase<K>;
};

const test1: NewSingleFruitCounts = {
  apple: 2,
  pear: 45,
};

type EachKey = 'first' | 'second' | 'third';

// second way to get keys
const myKeys = ['first', 'second', 'third'] as const;
type EachKeys2 = typeof myKeys[number];

type MappedKeys = {
  [K in EachKey]: {
    [K2 in K]: string;
  };
}[EachKey]; // <- partial iterator

const test2: MappedKeys = {
  first: 'foo',
  second: 'bar',
};

console.log({ test1 });
console.log({ test2 });
