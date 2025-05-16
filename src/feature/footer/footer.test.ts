import { Footer } from './footer';

const footer = new Footer();

test('footer should be defined', () => {
  expect(footer).toBeDefined();
});

test('footer should be instance of Footer', () => {
  expect(footer).toBeInstanceOf(Footer);
});
