function printIngredient(
  quantity: string,
  ingredient: string,
  extra?: string // optional arg,
) {
  console.log(`${quantity} ${ingredient} ${extra}`);
}

console.log('1C', 'flour');

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!;
    // ! overrides TS compiler as email may be undefined
  }
  return '';
}

function getEmailEasy(user: User): string {
  return user?.info?.email ?? '';
}

function addWithOptionalCallback(x: number, y: number, callback?: () => void) {
  console.log(x, y);
  callback?.(); // ?.() notation only calls if it exists
}
