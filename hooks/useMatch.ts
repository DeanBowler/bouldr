import { useMemo, DependencyList } from 'react';

export const Default = Symbol('match-default');

type MaybeFunc<TInput, TResult> = TResult | ((input: TInput) => TResult);

type Defaulted<TResult> = { [Default]: TResult };

export default function useMatch<TInput extends string | number, TResult>(
  value: TInput,
  caseMap:
    | Record<TInput, MaybeFunc<TInput, TResult>>
    | (Partial<Record<TInput, MaybeFunc<TInput, TResult>>> & Defaulted<MaybeFunc<TInput, TResult>>),
  deps?: DependencyList
): TResult {
  return useMemo(() => {
    const val = caseMap[value] ?? (caseMap as any)[Default];

    if (typeof val === 'function') return val(value);

    if (val !== undefined) return val;

    throw Error(`Unexpected input: ${value}`);
  }, deps ?? [value]);
}
