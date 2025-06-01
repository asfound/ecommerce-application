import type { Customer } from '@commercetools/platform-sdk';

import type { AppCustomer, AppCustomerAddress, MapAddressesParameters } from './types';

import { ADDRESS_TYPE } from './constants';

const mapAddresses = ({
  addresses,
  addressIds,
  addressType,
  allIds,
  defaultBillingAddressId,
  defaultShippingAddressId,
}: MapAddressesParameters): AppCustomerAddress[] => {
  return addresses
    .filter((address) => addressIds?.includes(address.id ?? ''))
    .map((address) => ({
      addressId: address.id ?? '',
      billing: addressType === ADDRESS_TYPE.BILLING && addressIds?.includes(address.id ?? ''),
      city: address.city ?? '',
      country: address.country,
      defaultBilling: defaultBillingAddressId === address.id,
      defaultShipping: defaultShippingAddressId === address.id,

      inBilling:
        addressType === ADDRESS_TYPE.SHIPPING &&
        allIds.billingAddressIds?.includes(address.id ?? ''),
      inShipping:
        addressType === ADDRESS_TYPE.BILLING &&
        allIds.shippingAddressIds?.includes(address.id ?? ''),
      postalCode: address.postalCode ?? '',
      shipping: addressType === ADDRESS_TYPE.SHIPPING && addressIds?.includes(address.id ?? ''),
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

  const billingAddresses = mapAddresses({
    addresses,
    addressIds: billingAddressIds,
    addressType: ADDRESS_TYPE.BILLING,
    allIds: { billingAddressIds, shippingAddressIds },
    defaultBillingAddressId,
    defaultShippingAddressId,
  });

  const shippingAddresses = mapAddresses({
    addresses,
    addressIds: shippingAddressIds,
    addressType: ADDRESS_TYPE.SHIPPING,
    allIds: { billingAddressIds, shippingAddressIds },
    defaultBillingAddressId,
    defaultShippingAddressId,
  });

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
