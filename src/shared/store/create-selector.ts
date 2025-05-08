import type { SelectorFunction } from './types';

/**
 * Wraps a selector function. Currently, it just returns the same function.
 *
 * @example
 *
 * interface ExampleState {
 *   counter: number;
 *   user: { age: number; name: string };
 * }
 *
 * // Without createSelector, you will always need to specify the return type in the typescript
 * const selectCounter = (state: ExampleState): number => state.counter;
 *
 * const selectUser = (state: ExampleState): { age: number; name: string } => state.user;
 *
 * // With createSelector, a selector function will be returned that will have a typed return value
 * const selectUser = createSelector((state: ExampleState) => state.user);
 *
 * store.subscribe(selectUser, (user) => {
 *   console.log('User changed:', user);
 * });
 *
 */
export const createSelector = <TState, TSlice>(selector: SelectorFunction<TState, TSlice>) => {
  return (state: TState): TSlice => {
    return selector(state);
  };
};
