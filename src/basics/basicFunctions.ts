// typing args
export const addNumbers = (a: number, b: number) => a + b;

// cmd k + i gives an overveiw in vsCode what the interpereted type is
export const addNumberswithReturnDefined = (a: number, b: number): number =>
  a + b;

// default params while typed
export const addString = (str1: string, str2: string = ''): string =>
  `${str1} ${str2}`;

//
export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;

// void returns
export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param));
};

// promise returns with generic return type
export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

// array and spread args
//A function can have at most one rest parameter, and that parameter has to be the last
// one in the function’s parameter list. F
function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(' ')}`;
}

// compile this file (using tsc command)
// check the js implementation
// function getNameUnsafe(user) {
//   return user.first + " " + user.last;
// }
// at runtime it's compeltely unsafe
export function getNameUnsafe(user: { first: string; last: string }): string {
  return `${user.first} ${user.last}`;
}

// this implementation ensures safety on nulls if we need to be safe at runtime
export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? 'first'} ${user?.last ?? 'last'}`;
}
