import { Store } from './store';

/**
 * A wrapper around the `Store` class to create a new store instance.
 * Can be used as an alternative to `new Store(...)`
 */
export const createStore = <TState extends object>(initialState: TState): Store<TState> => {
  return new Store(initialState);
};
