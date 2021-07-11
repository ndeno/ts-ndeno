type ThreeDCoordinate = [x: number, y: number, z: number];

// basic tuple usage
function add3DCoordinate(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinate([0, 100, 0], [10, 20, 30]));

type GetterSetter = [() => string, (v: string) => void];

// simple closure that holds a gettter and setter
function simpleStringState(initial: string): GetterSetter {
  let str: string = initial;
  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [str1getter, str1setter] = simpleStringState('hello');
const [str2getter, str2setter] = simpleStringState('jack');
console.log(str2getter());
console.log(str1getter());
str1setter('goodbye');
console.log(str1getter());
str1setter('again here');
console.log(str2getter());
console.log(str1getter());
