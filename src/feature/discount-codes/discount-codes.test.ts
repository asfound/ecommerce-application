import { DiscountCodesView } from './discount-codes.view';

const discountCodesView = new DiscountCodesView();

test('discountCodesView should be defined', () => {
  expect(discountCodesView).toBeDefined();
});

test('discountCodesView should be instance of DiscountCodesView', () => {
  expect(discountCodesView).toBeInstanceOf(DiscountCodesView);
});
