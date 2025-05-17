import { ProductCardListView } from './product-card-list.view';

const productCardListView = new ProductCardListView();

test('productCardListView should be defined', () => {
  expect(productCardListView).toBeDefined();
});

test('productCardListView should be instance of ProductCardListView', () => {
  expect(productCardListView).toBeInstanceOf(ProductCardListView);
});
