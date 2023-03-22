import { Equal, Expect } from './utils';

export type Event =
  | {
      type: 'click';
      event: MouseEvent;
    }
  | {
      type: 'focus';
      event: FocusEvent;
      additional: 'foo';
    }
  | {
      type: 'keydown';
      event: KeyboardEvent;
      additional: 'bar';
    };

// extracts any union member from tagged union that partially matches
// can match on a union too
type ClickEvent = Extract<Event, { type: 'click' }>;
type FooBarEvent = Extract<Event, { additional: 'foo' | 'bar' }>;

type tests = [Expect<Equal<ClickEvent, { type: 'click'; event: MouseEvent }>>];
