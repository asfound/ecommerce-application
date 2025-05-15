import { Navigation } from './navigation';

const navigation = new Navigation([]);

test('navigation should be defined', () => {
  expect(navigation).toBeDefined();
});

test('navigation should be instance of Navigation', () => {
  expect(navigation).toBeInstanceOf(Navigation);
});
