import { Equal, Expect } from './utils';

export const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
  SELF_DIRECTED: 'selfDirected',
  PLANNED_ONE_ON_ONE: 'planned1on1',
  PLANNED_SELF_DIRECTED: 'plannedSelfDirected',
} as const;

/*
Index into const object and exclude keys from resultant union
const - indexing - indexed access
*/
export type IndividualProgram = Exclude<
  typeof programModeEnumMap[keyof typeof programModeEnumMap],
  'group' | 'announcement'
>;

/*
  totally messy example, but ... 
  indexed by unions
*/
export type IndividualProgramWithUnions = typeof programModeEnumMap[
  | 'ONE_ON_ONE'
  | 'SELF_DIRECTED'
  | 'PLANNED_ONE_ON_ONE'
  | 'PLANNED_SELF_DIRECTED'];

type tests = [
  Expect<
    Equal<
      IndividualProgram,
      '1on1' | 'selfDirected' | 'planned1on1' | 'plannedSelfDirected'
    >
  >,
  Expect<
    Equal<
    IndividualProgramWithUnions,
      '1on1' | 'selfDirected' | 'planned1on1' | 'plannedSelfDirected'
    >
  >
];
