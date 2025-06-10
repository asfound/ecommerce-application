import { CartContainerView } from './cart-container.view';

const cartContainerView = new CartContainerView();

test('cartContainerView should be defined', () => {
  expect(cartContainerView).toBeDefined();
});

test('cartContainerView should be instance of CartContainerView', () => {
  expect(cartContainerView).toBeInstanceOf(CartContainerView);
});
