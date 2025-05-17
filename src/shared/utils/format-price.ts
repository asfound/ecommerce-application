import { APP_LOCALE } from '../constants/constants';

const PRICE = {
  CENTS_IN_DOLLAR: 100,
  CURRENCY: 'USD',
  FRACTION_DIGITS: 2,
} as const;

export const formatPrice = (centAmount: number): string => {
  return new Intl.NumberFormat(APP_LOCALE, {
    currency: PRICE.CURRENCY,
    minimumFractionDigits: PRICE.FRACTION_DIGITS,
    style: 'currency',
  }).format(centAmount / PRICE.CENTS_IN_DOLLAR);
};
