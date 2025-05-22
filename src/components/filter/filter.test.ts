import { Filter } from './filter';

const filter = new Filter();

test('filter should be defined', () => {
  expect(filter).toBeDefined();
});

test('filter should be instance of Filter', () => {
  expect(filter).toBeInstanceOf(Filter);
});
