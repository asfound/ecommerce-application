import type {
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
} from '@commercetools/platform-sdk';

export interface AddDiscountCodePayload {
  code: MyCartAddDiscountCodeAction['code'];
}

export interface AddLineItemPayload {
  quantity: MyCartAddLineItemAction['quantity'];
  sku: MyCartAddLineItemAction['sku'];
}

export interface RemoveDiscountCodePayload {
  discountCode: MyCartRemoveDiscountCodeAction['discountCode'];
}

export interface RemoveLineItemPayload {
  lineItemId: MyCartRemoveLineItemAction['lineItemId'];
  quantity?: MyCartRemoveLineItemAction['quantity'];
}
