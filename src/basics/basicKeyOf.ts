// Use keyof to get all of an object’s keys as a union of string literal types.

// generic pluck fucntion
// good use of extending keyof
function myPluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: 'Mimi', age: 12 },
  { name: 'LG', age: 13 },
];

// dogs becomes the DataType,
// then KeyType must be one of the keys of the DataType
console.log(myPluck(dogs, 'age'));
console.log(myPluck(dogs, 'name'));

// event maps
interface BaseEvent {
  time: number;
  user: string;
}
interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string }; // & is an intersection
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name] // key in operator
): void {
  console.log([name, data]);
}

sendEvent('addToCart', {
  productID: 'foo',
  user: 'baz',
  quantity: 1,
  time: 10,
});
sendEvent('checkout', { time: 20, user: 'bob' });
