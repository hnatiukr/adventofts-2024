import type { Equal, Expect } from 'type-testing';

type Demand<T, R extends T = T> = {
  demand: T extends R ? T : never;
};

declare let demand1: Demand<unknown>;
declare let demand2: Demand<string>;
declare let demand3: Demand<'Immediate 4% Pay Increase'>;
declare let demand4: Demand<'3 Days Paid Time Off Per Year'>;

type Demand1 = typeof demand1;
type t1 = Expect<Equal<Demand1, { demand: unknown }>>;
demand1 = demand1; // ✅
// @ts-expect-error
demand1 = demand2;
// @ts-expect-error
demand1 = demand3;
// @ts-expect-error
demand1 = demand4;

type Demand2 = typeof demand2;
type t2 = Expect<Equal<Demand2, { demand: string }>>;
// @ts-expect-error
demand2 = demand1;
demand2 = demand2; // ✅
// @ts-expect-error
demand2 = demand3;
// @ts-expect-error
demand2 = demand4;

type Demand3 = typeof demand3;
type t3 = Expect<Equal<Demand3, { demand: 'Immediate 4% Pay Increase' }>>;
// @ts-expect-error
demand3 = demand1;
// @ts-expect-error
demand3 = demand2;
demand3 = demand3; // ✅
// @ts-expect-error
demand3 = demand4;

type Demand4 = typeof demand4;
type t4 = Expect<Equal<Demand4, { demand: '3 Days Paid Time Off Per Year' }>>;
// @ts-expect-error
demand4 = demand1;
// @ts-expect-error
demand4 = demand2;
// @ts-expect-error
demand4 = demand3;
demand4 = demand4; // ✅