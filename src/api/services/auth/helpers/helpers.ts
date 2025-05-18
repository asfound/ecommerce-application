import type { BaseAddress } from '@commercetools/platform-sdk';

import type { AppCustomerDraft, SignupPayload } from '../types';

export const createCustomerDraft = (payload: SignupPayload): AppCustomerDraft => {
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
    billingAddresses: shippingAsBilling
      ? [DEFAULT_SHIPPING_ADDRESS_INDEX]
      : billingAddress
        ? [DEFAULT_BILLING_ADDRESS_INDEX]
        : undefined,
    dateOfBirth,
    defaultBillingAddress:
      !shippingAsBilling && billingAddress?.default ? DEFAULT_BILLING_ADDRESS_INDEX : undefined,
    defaultShippingAddress: shippingAddress.default ? DEFAULT_SHIPPING_ADDRESS_INDEX : undefined,
    email,
    firstName,
    lastName,
    password,
    shippingAddresses: [DEFAULT_SHIPPING_ADDRESS_INDEX],
  };
};
