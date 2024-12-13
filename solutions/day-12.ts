import type { Equal, Expect } from 'type-testing';

type IsEven<N extends number> = `${N}` extends `${number}${infer Rest}`
  ? Rest extends '' ? `${N}` extends '0' | '2' | '4' | '6' | '8' ? true
    : false
  : IsEven<StringLength<Rest>>
  : false;

type StringLength<
  Str extends string,
  Acc extends unknown[] = [],
> = Str extends `${infer First}${infer Rest}` ? StringLength<Rest, [...Acc, First]>
  : Acc['length'];

type NaughtyOrNice<Name extends string> = IsEven<StringLength<Name>> extends true ? 'naughty'
  : 'nice';

type FormatNames<T extends [string, string, string][]> = {
  [K in keyof T]: T[K] extends [infer Name extends string, string, infer Count] ? {
      name: Name;
      count: Count extends `${infer CountNum extends number}` ? CountNum
        : never;
      rating: NaughtyOrNice<Name>;
    }
    : never;
};

type t0_actual = FormatNames<Names>['length'];
type t0_expected = Names['length'];
type t0 = Expect<Equal<t0_actual, t0_expected>>;

type t1_actual = FormatNames<Names>[0];
type t1_expected = {
  name: 'Liam';
  count: 20802;
  rating: 'naughty'; // even number of characters in the name get 'naughty'
};
type t1 = Expect<Equal<t1_actual, t1_expected>>;

type t2_actual = FormatNames<Names>[1];
type t2_expected = {
  name: 'Yanni';
  count: 19;
  rating: 'nice'; // odd number of characters in the name get 'nice'
};
type t2 = Expect<Equal<t2_actual, t2_expected>>;

type t3_actual = FormatNames<Names>[2];
type t3_expected = {
  name: 'Petra';
  count: 148;
  rating: 'nice';
};
type t3 = Expect<Equal<t3_actual, t3_expected>>;

type t4_actual = FormatNames<Names>[3];
type t4_expected = {
  name: 'Aala';
  count: 5;
  rating: 'naughty';
};
type t4 = Expect<Equal<t4_actual, t4_expected>>;

type t5_actual = FormatNames<Names>[4];
type t5_expected = {
  name: 'Aagya';
  count: 5;
  rating: 'nice';
};
type t5 = Expect<Equal<t5_actual, t5_expected>>;

type Names = [
  ['Liam', 'someString', '20802'],
  ['Yanni', 'someString', '19'],
  ['Petra', 'someString', '148'],
  ['Aala', 'someString', '5'],
  ['Aagya', 'someString', '5'],
];
