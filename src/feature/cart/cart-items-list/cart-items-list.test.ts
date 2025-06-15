import { CartItemsListView } from './cart-items-list.view';

const cartItemsListView = new CartItemsListView();

test('cartItemsListView should be defined', () => {
  expect(cartItemsListView).toBeDefined();
});

test('cartItemsListView should be instance of CartItemsListView', () => {
  expect(cartItemsListView).toBeInstanceOf(CartItemsListView);
});
