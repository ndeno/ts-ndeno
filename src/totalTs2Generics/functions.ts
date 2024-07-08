const returnWhatsPassedIn = <T>(param: T) => {
  return param;
};

const returnWhatIPassInStringOnly = <T extends string>(t: T) => t;

const returnBothOfWhatIPassIn = <A, B>(a: A, b: B) => {
  return {
    a,
    b,
  };
};

type Params<T1, T2> = {
  a: T1;
  b: T2;
};

const returnWithTypeHelper = <T1, T2>(params: Params<T1, T2>) => ({
  first: params.a,
  second: params.b,
});

// generic class
class Component<T> {
  private props: T;

  constructor(props: T) {
    this.props = props;
  }

  getProps = () => this.props;
}

const component = new Component({ foo: 23, bar: 44 });

export const concatenateFirstNameAndLastName = <
  T extends { firstName: string; lastName: string }
>(
  user: T
) => {
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  };
};

const users = [
  {
    id: 123,
    firstName: 'Foo',
    lastName: 'Bar',
  },
];

const newUsers = users.map(concatenateFirstNameAndLastName);

// log
// {
//   newUsers: [
//     { id: 123, firstName: 'Foo', lastName: 'Bar', fullName: 'Foo Bar' }
//   ]
// }


