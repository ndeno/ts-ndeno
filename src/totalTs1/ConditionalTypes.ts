import { Equal, Expect } from './utils';

type Fruit = 'apple' | 'banana' | 'orange';

type AppleOrBanana =
  | (Fruit extends 'apple' ? 'apple' : 'banana')
  | (Fruit extends 'banana' ? 'banana' : 'apple');

type tests = [Expect<Equal<AppleOrBanana, 'apple' | 'banana'>>];
