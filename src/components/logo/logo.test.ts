import { Logo } from './logo';

const logo = new Logo();

test('logo should be defined', () => {
  expect(logo).toBeDefined();
});

test('logo should be instance of Logo', () => {
  expect(logo).toBeInstanceOf(Logo);
});
