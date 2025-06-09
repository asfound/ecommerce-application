import type { DiscountCode } from '@commercetools/platform-sdk';

import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppDiscountCode } from './types';

export const mapToAppDiscountCode = (discountCode: DiscountCode): AppDiscountCode => ({
  code: discountCode.code,
  description: discountCode.description?.[APP_LOCALE] ?? '',
  name: discountCode.name?.[APP_LOCALE] ?? '',
});
