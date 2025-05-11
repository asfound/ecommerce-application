import { createSelector } from '../create-selector';
import { Store } from '../store';

const initialState = {
  counter: 0,
  user: { age: '26', name: 'Lana' },
};

const store = new Store(initialState);

const selectCounter = createSelector((state: typeof initialState) => state.counter);
const selectUser = createSelector((state: typeof initialState) => state.user);

beforeEach(() => {
  store.reset();
});

test('store should be defined', () => {
  expect(store).toBeDefined();
});

test('getInitialState should return initialState', () => {
  expect(store.getInitialState()).toEqual(initialState);
});

test('setState should change state', () => {
  const newState: typeof initialState = {
    counter: 1,
    user: { age: '22', name: 'Elsa' },
  };

  store.setState(newState);

  expect(store.getState()).toEqual(newState);
});

test('getState should return changed state', () => {
  const newState: typeof initialState = {
    counter: 1,
    user: { age: '22', name: 'Elsa' },
  };

  store.setState(newState);

  expect(store.getState()).toEqual(newState);
});

test('select should return parts of state', () => {
  const newState: typeof initialState = {
    counter: 1,
    user: { age: '22', name: 'Elsa' },
  };

  store.setState(newState);

  const { counter, user } = store.select((state) => ({
    counter: state.counter,
    user: state.user,
  }));

  expect(counter).toBe(newState.counter);
  expect(user).toEqual(newState.user);
});

test('subscribe should call callback immediately by default', () => {
  const mockCallback = vi.fn();

  store.subscribe(selectCounter, mockCallback);

  const expectedTimes = 1;

  expect(mockCallback).toHaveBeenCalledTimes(expectedTimes);
});

test('subscribe should not call callback whe isImmediate set to false', () => {
  const mockCallback = vi.fn();

  store.subscribe(selectCounter, mockCallback, { isImmediate: false });

  const expectedTimes = 0;

  expect(mockCallback).toHaveBeenCalledTimes(expectedTimes);
});

test('callbacks should be called with proper arguments', () => {
  const counterCallback = vi.fn((c: number) => c);
  const userCallback = vi.fn((u: { age: string; name: string }) => u);

  store.subscribe(selectCounter, counterCallback);
  store.subscribe(selectUser, userCallback);

  expect(counterCallback).toBeCalledWith(initialState.counter);
  expect(userCallback).toBeCalledWith(initialState.user);
});
