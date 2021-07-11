type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string | number; // for any string key, map a string or number
};

const dog: MyFlexibleDogInfo = {
  name: 'LG',
  breed: 'Mutt',
  age: 2,
};

interface DogInfo {
  name: string;
  age: number;
}

/**
 * for ever key in the original type, map a null
 */
type OptionsFlag<Type> = {
  [Property in keyof Type]: null;
};

type DogInfoOptions = OptionsFlag<DogInfo>;

/**
 * for any object, get the listenrs for the keys
 * make an object of keys in Type
 * which maps to a function with arg of that type
 * for both optional changes and deletes
 *
 */
type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
    newValue: Type[Property]
  ) => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw 'Needs to be implemented';
}

const lg: DogInfo = {
  name: 'LG',
  age: 13,
};

// Used to just find the listeners type of DogInfo
type DogInfoListeners = Listeners<DogInfo>;

listenToObject(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {},
});
