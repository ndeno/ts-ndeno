/**
 * enums are a better idea than consts always
 */
// const beforeLoad = "beforeLoad";
// const loading = "loading";
// const loaded = "loaded";

enum LoadingState {
  beforeLoad = 'beforeLoad',
  loading = 'loading',
  loaded = 'loaded',
}

const englishLoadingStates = {
  [LoadingState.beforeLoad]: 'Before Load',
};

const isLoading = (state: LoadingState) => state === LoadingState.loading;

console.log(isLoading(LoadingState.beforeLoad));

// You can also use string values for enums, or even mix string and number values:
enum Color {
  Red = '#c10000',
  Blue = '#007ac1',
  Pink = 0xc10050, // A hexadecimal literal
  White = 255, // A decimal literal
}
let red = Color.Red; // Color
let pink = Color.Pink; // Color
/**
 * TypeScript lets you access enums both by value and by key for convenience, but this
 * can get unsafe quickly:
 */

let foo = Color.Red; // Color
// let bar = Color.Green // Error TS2339: Property 'Green' does not exist

// on type 'typeof Color'.
let c = Color[0]; // string
let d = Color[6]; // string (!!!)
/**
 * You shouldn’t be able to get Color[6], but TypeScript doesn’t stop you! We can ask
 * TypeScript to prevent this kind of unsafe access by opting into a safer subset of enum
 * behavior with const enum instead. Let’s rewrite our Language enum from earlier:
 */

const enum Language {
  English,
  Spanish,
  Russian,
}
// Accessing a valid enum key
// this is as far as it goes
let a = Language.English; // Language

// Literal types
// number literals
function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}
console.log(rollDice(3));

// string literals
function sendEvent(name: 'addToCart', data: { productId: number }): void;
function sendEvent(name: 'checkout', data: { cartCount: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: 123123 });
