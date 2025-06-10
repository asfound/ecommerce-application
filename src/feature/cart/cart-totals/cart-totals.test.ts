import { CartTotalsView } from './cart-totals.view';

const cartTotalsView = new CartTotalsView();

test('cartTotalsView should be defined', () => {
  expect(cartTotalsView).toBeDefined();
});

test('cartTotalsView should be instance of CartTotalsView', () => {
  expect(cartTotalsView).toBeInstanceOf(CartTotalsView);
});
