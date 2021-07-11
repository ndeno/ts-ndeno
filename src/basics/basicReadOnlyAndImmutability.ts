interface Cat {
  name: string;
  breed: string;
}

/**
 * readonly utility type used in return type
 */
function makeCat(name: string, breed: string): Readonly<Cat> {
  return {
    name,
    breed,
  };
}

const usul = makeCat('Usul', 'Tabby');
// usul.name = "Piter"; // cannot be done

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const c1 = makeCoordinate(10, 20, 30);
// c1[0] = 50;

/**
 * const opts your type out of widening and recursively marks its members as
 * readonly, even for deeply nested data structures
 */
const reallyConst = [1, 2, 3] as const;
// reallyConst[0] = 50;
