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
  lineItemKey: MyCartAddLineItemAction['key'];
  quantity: MyCartAddLineItemAction['quantity'];
  sku: MyCartAddLineItemAction['sku'];
}

export interface DiscountCodePayload {
  code: MyCartAddDiscountCodeAction['code'];
}

export interface RemoveDiscountCodePayload {
  discountCode: MyCartRemoveDiscountCodeAction['discountCode'];
}

export interface RemoveLineItemPayload {
  lineItemKey: MyCartRemoveLineItemAction['lineItemKey'];
  quantity?: MyCartRemoveLineItemAction['quantity'];
}
