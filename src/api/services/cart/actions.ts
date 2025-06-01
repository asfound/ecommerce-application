import type {
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

import type {
  AddDiscountCodePayload,
  AddLineItemPayload,
  RemoveDiscountCodePayload,
  RemoveLineItemPayload,
} from './types';

export const createAddLineItemAction = (payload: AddLineItemPayload): MyCartAddLineItemAction => ({
  action: 'addLineItem',
  quantity: payload.quantity,
  sku: payload.sku,
});

export const createRemoveLineItemAction = (
  payload: RemoveLineItemPayload,
): MyCartRemoveLineItemAction => ({
  action: 'removeLineItem',
  lineItemId: payload.lineItemId,
  quantity: payload.quantity,
});

export const createAddDiscountCodeAction = (
  payload: AddDiscountCodePayload,
): MyCartAddDiscountCodeAction => ({
  action: 'addDiscountCode',
  code: payload.code,
});

export const createRemoveDiscountCodeAction = (
  payload: RemoveDiscountCodePayload,
): MyCartRemoveDiscountCodeAction => ({
  action: 'removeDiscountCode',
  discountCode: payload.discountCode,
});
