import type { BaseAddress } from '@commercetools/platform-sdk';

import type { AppCustomerDraft, SignupPayload } from './types';

import { DEFAULT_ADDRESS_INDEX } from './constants';

export const createCustomerDraft = (payload: SignupPayload): AppCustomerDraft => {
  const { dateOfBirth, email, firstName, lastName, password } = payload;

  const { billingAddress, shippingAddress, shippingAsBilling } = payload.addresses;

  const addresses: BaseAddress[] = [shippingAddress];

  if (!shippingAsBilling && billingAddress) {
    addresses.push(billingAddress);
  }

  return {
    addresses,
    billingAddresses: shippingAsBilling
      ? [DEFAULT_ADDRESS_INDEX.SHIPPING]
      : billingAddress
        ? [DEFAULT_ADDRESS_INDEX.BILLING]
        : undefined,
    dateOfBirth,
    defaultBillingAddress:
      !shippingAsBilling && billingAddress?.default ? DEFAULT_ADDRESS_INDEX.BILLING : undefined,
    defaultShippingAddress: shippingAddress.default ? DEFAULT_ADDRESS_INDEX.SHIPPING : undefined,
    email,
    firstName,
    lastName,
    password,
    shippingAddresses: [DEFAULT_ADDRESS_INDEX.SHIPPING],
  };
};
