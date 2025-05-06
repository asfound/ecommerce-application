import type { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';

import { ApiBuilder } from '~/api/client/api-builder';
import { ClientTokenCache } from '~/api/client/token-cache';

import type { LoginPayload, SignupPayload } from '../types';

export const createCustomerDraft = (payload: SignupPayload): MyCustomerDraft => {
  const { dateOfBirth, email, firstName, lastName, password } = payload;

  const { billingAddress, shippingAddress, shippingAsBilling } = payload.addresses;

  const addresses: BaseAddress[] = [shippingAddress];

  if (!shippingAsBilling && billingAddress) {
    addresses.push(billingAddress);
  }

  const DEFAULT_SHIPPING_ADDRESS_INDEX = 0;
  const DEFAULT_BILLING_ADDRESS_INDEX = 1;

  return {
    addresses,
    dateOfBirth,
    defaultBillingAddress:
      !shippingAsBilling && billingAddress?.default ? DEFAULT_BILLING_ADDRESS_INDEX : undefined,
    defaultShippingAddress: shippingAddress.default ? DEFAULT_SHIPPING_ADDRESS_INDEX : undefined,
    email,
    firstName,
    lastName,
    password,
  };
};

export const handleSuccessResponse = (payload: LoginPayload): void => {
  ClientTokenCache.clearAnonymousCache();

  ApiBuilder.instance.usePasswordBuilder({
    password: payload.password,
    username: payload.email,
  });
};
