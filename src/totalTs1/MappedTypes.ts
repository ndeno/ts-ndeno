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

interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

// use to search for all camel/pascal case ids
type ContainsId<T> = T extends `${string}${'id' | 'Id'}${string}` ? T : never;

// map only keys which meet a certain conditions
type OnlyIdKeys<T> = {
  [A in keyof T as ContainsId<A>]: T[A];
};

const onlyIdKeys: OnlyIdKeys<Example> = {
  groupId: '123',
  id: '123',
  organisationId: '123',
};

export type RouteTaggedUnion =
  | {
      route: '/';
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: '/about'; search: {} }
  | { route: '/admin'; search: {} }
  | { route: '/admin/users'; search: {} };

type RouteInfer<T> = T extends { route: infer K } ? K : T;
const test: RouteInfer<RouteTaggedUnion> = '/';

// verbose extract to get keys of discriminated object to a m

export type VerboseExtract<T extends RouteTaggedUnion> = {
  [A in RouteInfer<T>]: T['search'];
};

// much more simple
export type SimplerExtract = {
  [R in RouteTaggedUnion as R['route']]: R['search'];
};
