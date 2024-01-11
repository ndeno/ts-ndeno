// extract the value of data from the type function
// Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
type GetDataValue<T> = T extends { data: infer TData } ? TData : never;

// get value of type of another type parameter
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

// use this pattern to extarct what you need from lib functions without having
// to write a type annotation for it
type InferPropsFromServerSideFunction<T> = T extends () => Promise<{
  props: infer P;
}>
  ? P
  : never;

export { GetDataValue, GetPoint };
