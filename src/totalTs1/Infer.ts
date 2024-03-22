// How to extract the value of data from the type function
// Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
type GetDataValue<T> = T extends { data: infer TData } ? TData : never;

// How to get value of type of another type parameter
interface MyComplexInterface<Event, Context, Name, Point> {
  getEvent: () => Event;
  getContext: () => Context;
  getName: () => Name;
  getPoint: () => Point;
}

type Example = MyComplexInterface<
  'click',
  'window',
  'my-event',
  { x: 12; y: 14 }
>;

type GetPoint<T> = T extends MyComplexInterface<any, any, any, infer TPoint>
  ? TPoint
  : never;

type PointFoo = GetPoint<MyComplexInterface<1, 2, 3, 'foo'>>;

// How to infer the return type from a promise
// use this pattern to extarct what you need from lib functions without having
// to write a type annotation for it
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer P;
}>
  ? P
  : never;

// How to conditionally extract many different values across different branches
const parser1 = {
  parse: () => 1,
};

const parser2 = () => '123';

const parser3 = {
  extract: () => true,
};

type GetParserResult<T> = T extends { parse: () => infer TParse }
  ? TParse
  : T extends { extract: () => infer TExtract }
  ? TExtract
  : T extends () => infer TReturn
  ? TReturn
  : never;

// how to make it nice with a union
type GetParserResultWithUnion<T> = T extends
  | { parse: () => infer TParse }
  | { extract: () => infer TParse }
  | (() => infer TParse)
  ? TParse
  : never;

const foo: GetParserResultWithUnion<typeof parser1> = 123;

export { GetDataValue, GetPoint, GetParserResult, GetParserResultWithUnion };
