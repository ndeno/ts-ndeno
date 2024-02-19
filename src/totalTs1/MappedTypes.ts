type Route = '/' | '/about' | '/admin' | '/admin/users';

// create an object from a union
type RoutesObject = {
  [Key in Route]: Key;
};

// make them optional
type OptionalRoutesObject = {
  [Key in Route]?: Key;
};

// get the keys of an object and use them
interface Attributes {
  firstName: string;
  lastName: string;
  age: number;
}

type AttributeGetters = {
  [A in keyof Attributes]: A extends 'firstName' | 'lastName'
    ? () => string
    : () => number;
};

type AttributeGettersKeyof = {
  [A in keyof Attributes]: () => Attributes[A];
};

type AttributeGettersRemapped = {
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K];
};
