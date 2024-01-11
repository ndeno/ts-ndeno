// this extends any function
type AnyFunc = (...args: any) => any;

// basic infer
// gets the type foo of a {data: Foo} object
type GetDataValue<T> = T extends { data: infer R } ? R : never;
