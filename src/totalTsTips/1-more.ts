import { fruitCounts } from "./1-derive-union-from-object"

type MoreFruitCount = {
  [Key in keyof typeof fruitCounts]: {
    type: Key,
  } & Record<`${Key}Id`, string>
}[keyof typeof fruitCounts]


type DeepFruitObject<T extends string> = {
  [x: string]: `${T}-Value`,
}
type DeepFruitCount = {
  [K in keyof typeof fruitCounts]: {
    [K2 in K] : DeepFruitObject<K2>
  }
}

const test: MoreFruitCount = {
  type: 'pear',
  pearId: 'foo',
}
