// to run: $ npx ts-node [filename]
export function printToFile(text: string, callback: () => void): void {
  console.log('text', text);
  callback();
}

export function arrayMutator(
  numbers: number[],
  mutate: (v: number) => number
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutator([1, 2, 3], (n) => n * 2));

// this is hard to read, best make a type for your function params

type MutationFunction = (v: number) => number;

export function betterMutator(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return arrayMutator(numbers, mutate);
}

// return functions

// use a closure

// use cmd k + i to get the return type

type AdderReturn = (val: number) => number;

export function makeAdder(num: number): AdderReturn {
  return (val: number) => num + val;
}

const addFifty = makeAdder(50);

console.log('adding some: ', addFifty(2));
