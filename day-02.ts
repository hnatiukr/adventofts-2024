import type { Equal, Expect } from "npm:type-testing";

type Demand<T extends number = 900_000> = T;

type t0_actual = Demand;
type t0_expected = 900_000;
type t0 = Expect<Equal<t0_actual, t0_expected>>;

// @ts-expect-error
type e0 = Expect<Equal<Demand, number>>;
