import { String } from 'ts-toolbelt';
import { Equal, Expect } from './utils';
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

type Route = `/${string}`;

export const goToRoute = (route: Route) => {};

// Should succeed:

goToRoute('/');
goToRoute('/admin/users');

// Should error:
// @ts-expect-error
goToRoute('users/1');
// @ts-expect-error
goToRoute('http://facebook.com');

// pull out dynamic routes
type Routes = '/users' | '/users/:id' | '/posts' | '/posts/:id' | '/other/:id';
type DynamicRoutes = Extract<Routes, `/${string}:id`>;

// all possible permuations of string literal unions
// https://www.typescriptlang.org/play?#code/C4TwDgpgBAogtgQwJYBsAyB7AxglECSAIgM5QC8UARAO4QpYZwQD6EiqlUAPlW8iswAWEBABMkAOwDmlANwAoUJCgAxDBmAQATphx4ipCpQBm6zVubAkwPJx4mz25sQgTRGY8bnzF4aAEEUdGxcAhJyKAADABIAb3h+XVCDblVHHRD9EgBfZiRRSIUAeiKoMoA9AH4gA

// https://www.totaltypescript.com/tips/decode-url-search-params-at-the-type-level-with-ts-toolbelt

// tstoolbelt split
type Path = 'Users/Nial/Documents/notes.txt';

type SplitPath = String.Split<Path, '/'>;

type testSplit = [
  Expect<Equal<SplitPath, ['Users', 'Nial', 'Documents', 'notes.txt']>>
];

// template literal as object
type TemplateLiteralKey = `${'user' | 'post' | 'comment'}${'Id' | 'Name'}`;

type ObjectOfKeys = Record<TemplateLiteralKey, string>;
type ObjectOfKeysMapped = {
  [key in TemplateLiteralKey]: string;
};
type ObjectOfKeysMappedButUppercase = {
  [key in Uppercase<TemplateLiteralKey>]: string;
};
