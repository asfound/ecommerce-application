import { CENTS_IN_DOLLAR } from '~/api/services/products/constants';

export const getDiscountPercent = (defaultPrice: number, discountedPrice: number): string => {
  const discount = ((defaultPrice - discountedPrice) / defaultPrice) * CENTS_IN_DOLLAR;
  return '-' + Math.round(discount).toString() + '%';
};
