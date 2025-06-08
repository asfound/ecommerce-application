import type { LineItem } from '@commercetools/platform-sdk';

import { isAttribute } from '~/api/types/guards';
import { APP_LOCALE } from '~/shared/constants/constants';

import type { AppCartProduct } from '../products/types';

import { PRODUCT_ATTRIBUTE } from '../products/constants';

export const mapLineItemToAppCartProduct = (
  lineItem: LineItem,
  locale: string = APP_LOCALE,
): AppCartProduct => {
  const weightAttribute = lineItem.variant.attributes?.find(
    (attribute) => attribute.name === PRODUCT_ATTRIBUTE.WEIGHT,
  );

  const weightValue: unknown = weightAttribute?.value;
  const weightLabel = isAttribute(weightValue) ? weightValue.label : '';

  return {
    discountedPrice: lineItem.discountedPricePerQuantity[0]?.discountedPrice.value.centAmount,
    image: {
      label: lineItem.variant.images?.[0]?.label ?? '',
      url: lineItem.variant.images?.[0]?.url ?? '',
    },
    lineItemKey: lineItem.key ?? lineItem.id,
    name: lineItem.name[locale],
    price: {
      default: lineItem.price.value.centAmount,
      discounted: lineItem.price.discounted?.value.centAmount,
    },
    quantity: lineItem.quantity,
    sku: lineItem.variant.sku ?? '',
    totalPrice: lineItem.totalPrice.centAmount,
    weight: weightAttribute ? weightLabel : undefined,
  };
};
