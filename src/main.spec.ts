import type { AddFunction } from './main';
import { add } from './main';

describe('math', () => {
  const testAdd: AddFunction = add;

  it('adds numbers', () => {
    expect(testAdd(2, 3)).toBe(5);
    expect(testAdd(6, 9)).toBe(15);
  });
});
