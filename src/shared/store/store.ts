import type { SelectorFunction, Subscriber } from './types/types';

export class Store<TState extends object> {
  private currentState: TState;

  private readonly initialState: TState;

  private readonly subscribers = new Set<Subscriber<TState>>();

  public constructor(initialState: TState) {
    this.initialState = initialState;

    this.currentState = initialState;
  }

  public getInitialState(): Readonly<TState> {
    return this.initialState;
  }

  public getState(): Readonly<TState> {
    return structuredClone(this.currentState);
  }

  public reset(): void {
    this.setState(() => this.initialState);
  }

  public select<TSlice>(selector: SelectorFunction<TState, TSlice>): TSlice {
    return selector(this.currentState);
  }

  public setState(partial: ((previousState: TState) => Partial<TState>) | Partial<TState>): void {
    const nextPartial = typeof partial === 'function' ? partial(this.currentState) : partial;

    const previousState = this.currentState;

    const nextState = { ...this.currentState, ...nextPartial };

    this.currentState = nextState;

    for (const subscriber of this.subscribers) {
      const previousSlice = subscriber.selector(previousState);
      const nextSlice = subscriber.selector(nextState);

      if (!subscriber.equalityFunction(previousSlice, nextSlice)) {
        subscriber.callback(nextSlice);
      }
    }
  }

  public subscribe<TSlice>(
    selector: SelectorFunction<TState, TSlice>,
    callback: (payload: TSlice) => void,
    options?: {
      equalityFunction?(a: TSlice, b: TSlice): boolean;
      immediate?: boolean;
    },
  ): VoidFunction {
    const subscriber: Subscriber<TState, TSlice> = {
      callback,
      equalityFunction: options?.equalityFunction?.bind(this) ?? Object.is,
      selector,
    };

    if (options?.immediate ?? true) {
      callback(selector(this.currentState));
    }

    this.subscribers.add(subscriber);

    return () => {
      this.subscribers.delete(subscriber);
    };
  }
}
