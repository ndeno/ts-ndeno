// typescript has to infer the type without type annotations
// let is really loose, as long as the type doesn't change 
let x = 'x';
x = 'a';
x = 'Four score and seven years ago...';
// use annotations if you need it narrower;

let x2: 1 | 2 | 3 = 1; 
x2 = 3;  

// const are really narrow - this type is '1' only. 
const y = '1'; 

// objects consider each property as if defined by a let, values change, no type changes
const v = {
  x: 1,
 };
 v.x = 3;
//  v.x = '3'; // breaks
//  v.y = 4; // breaks 
//  v.name = 'Pythagoras'; // breaks 

// use widening annotation if required
const v2: {x: 1|3|5} = {
  x: 1,
 };

 // the const keyword can narrow the object or array type of instantiation

 const v3 = {
  x: 1,
  y: 2,
 } as const; // Type is { readonly x: 1; readonly y: 2; }
 const v4 = {
  x: 1 as const,
  y: 2,
 }; // Type is { x: 1; y: number; }
