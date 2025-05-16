import { HeaderView } from './header.view';

const header = new HeaderView();

test('header should be defined', () => {
  expect(header).toBeDefined();
});

test('header should be instance of HeaderView', () => {
  expect(header).toBeInstanceOf(HeaderView);
});
