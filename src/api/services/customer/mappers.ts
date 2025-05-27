import type { Customer } from '@commercetools/platform-sdk';

import type { AppCustomer, AppCustomerAddress } from './types';

const mapAddresses = (
  addresses: Customer['addresses'],
  addressIds: string[] | undefined,
  defaultBillingAddressId: string | undefined,
  defaultShippingAddressId: string | undefined,
  type: 'billing' | 'shipping',
): AppCustomerAddress[] => {
  return addresses
    .filter((address) => addressIds?.includes(address.id ?? ''))
    .map((address) => ({
      addressId: address.id ?? '',
      billing: type === 'billing' && addressIds?.includes(address.id ?? ''),
      city: address.city ?? '',
      country: address.country,
      defaultBilling: defaultBillingAddressId === address.id,
      defaultShipping: defaultShippingAddressId === address.id,
      postalCode: address.postalCode ?? '',
      shipping: type === 'shipping' && addressIds?.includes(address.id ?? ''),
      streetName: address.streetName ?? '',
    }));
};

export const mapToAppCustomer = (customer: Customer): AppCustomer => {
  const {
    addresses,
    billingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
    shippingAddressIds,
  } = customer;

  const billingAddresses = mapAddresses(
    addresses,
    billingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
    'billing',
  );

  const shippingAddresses = mapAddresses(
    addresses,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
    'shipping',
  );

  return {
    billingAddresses,
    dateOfBirth: customer.dateOfBirth ?? '',
    email: customer.email,
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    shippingAddresses,
    version: customer.version,
  };
};
