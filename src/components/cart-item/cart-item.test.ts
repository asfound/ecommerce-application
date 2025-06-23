import type { AppCartProduct } from '~/api/services/products/types';

import type { CartItemCallbacks } from './cart-item';

import { CartItem } from './cart-item';

const mockProduct: AppCartProduct = {
  image: { label: 'test', url: 'test' },
  lineItemKey: 'test',
  name: 'test',
  price: { default: 0 },
  productId: 'test',
  quantity: 1,
  sku: 'test',
  totalPrice: 0,
  weight: 'test',
};

const mockCallbacks: CartItemCallbacks = {
  onDecrementItem: vi.fn(),
  onIncrementItem: vi.fn(),
  onNavigateToDetails: vi.fn(),
  onRemoveItem: vi.fn(),
};

test.skip('cartItem should be defined', () => {
  const cartItem = new CartItem(mockProduct, mockCallbacks);
  expect(cartItem).toBeDefined();
});

test.skip('cartItem should be instance of CartItem', () => {
  const cartItem = new CartItem(mockProduct, mockCallbacks);
  expect(cartItem).toBeInstanceOf(CartItem);
});
