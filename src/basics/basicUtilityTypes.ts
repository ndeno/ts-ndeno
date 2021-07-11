interface MyUser {
  name: string;
  id: number;
  email?: string;
}

// just optionals all the components
type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  'merge func',
  merge(
    {
      name: 'Jack',
      id: 2,
      email: 'dontemail@dontemail.com',
    },
    {
      email: 'dontemailbaz@dontemail.com',
    }
  )
);

// requires all keys
type RequiredMyUser = Required<MyUser>;

// choose the keys you want
type JustEmailAndName = Pick<MyUser, 'email' | 'name'>;

// remove the user you want
type UserWithoutID = Omit<MyUser, 'id'>;

/**
 * nice destructure, with rest
 * record is a map type, type of {myUser : rest }
 */
const mapById = (users: MyUser[]): Record<MyUser['id'], UserWithoutID> => {
  return users.reduce((a, v) => {
    const { id, ...rest } = v;
    return {
      ...a,
      [id]: rest,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: 1,
      name: 'Mr. Foo',
      email: 'hello@foo.co',
    },
    {
      id: 2,
      name: 'Mrs. Baz',
    },
  ])
);
