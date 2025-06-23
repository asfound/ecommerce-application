export type SelectorFunction<TState, TSlice> = (state: TState) => TSlice;

export interface Subscriber<TState extends object, TSlice = unknown> {
  callback(payload: TSlice | TState): Promise<void> | void;
  equalityFunction(a: TSlice, b: TSlice): boolean;
  selector(state: TState): TSlice;
}
