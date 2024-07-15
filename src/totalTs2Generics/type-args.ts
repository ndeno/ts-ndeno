export const createSet = <T>() => {
  return new Set<T>();
};

export const createSetWithDefault = <T = string>() => {
  return new Set<T>();
};

export class Component<TProps> {
  private props: TProps;

  constructor(props: TProps) {
    this.props = props;
  }

  getProps = () => this.props;
}

// adding the generic type arguement into the generic slot of the type helper
const cloneComponent = <TProps>(component: Component<TProps>) => {
  return new Component(component.getProps());
};

const newComponent = cloneComponent(new Component({ foo: 'bar' }));

const array = [
  {
    name: 'John',
  },
  {
    name: 'Steve',
  },
];

// strongly type a reduce function using it's generics
type ReducedType = Record<string, { name: string }>;

const reduceWithTypeArg = array.reduce<ReducedType>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

const reduceWithTypedAccumulator = array.reduce((accum: ReducedType, item) => {
  accum[item.name] = item;
  return accum;
}, {});

// add a generic to prevent anys from being introduced through library code
const fetchData = async <TData>(url: string) => {
  const data: TData = await fetch(url).then((response) => response.json());
  return data;
};
