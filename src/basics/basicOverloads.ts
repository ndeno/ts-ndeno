interface Coordinate {
  x: number;
  y: number;
}
// these two functions, not great
function parseCoordinateFromObject(obj: Coordinate): Coordinate {
  return {
    ...obj,
  };
}
function parseCoordinateFromNumber(x: number, y: number): Coordinate {
  return {
    x,
    y,
  };
}

// opportunity to overload instead of this redundancy

// FIRSTLY
// define the method signaures
function myParse(obj: Coordinate): Coordinate;
function myParse(x: number, y: number): Coordinate;
//  SECONDLY
// define the implementation
// note that the second arg is optional, to allow for a single arg call
// bonus string method
function myParse(str: string): Coordinate;
function myParse(arg1: unknown, arg2?: unknown): Coordinate {
  let returnCoord: Coordinate = {
    x: 0,
    y: 0,
  };

  // unknown args must be cast or type checked before use
  // basic example of a type-guard
  if (typeof arg1 === 'object') {
    returnCoord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === 'string') {
    const [x, y] = (arg1 as string).split(',').map((str) => {
      const [_, value] = str.split(':');

      return parseInt(value, 10);
    });
    returnCoord = {
      x,
      y,
    };
  } else {
    returnCoord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return returnCoord;
}

console.log(myParse(14, 45));
console.log(myParse({ x: 77, y: 83 }));
console.log(myParse('x:45,y:33'));
