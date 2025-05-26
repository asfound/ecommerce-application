import type {
  BaseAddress,
  MyCustomerAddAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerChangeEmailAction,
  MyCustomerRemoveAddressAction,
  MyCustomerRemoveBillingAddressIdAction,
  MyCustomerRemoveShippingAddressIdAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerSetDefaultBillingAddressAction,
  MyCustomerSetDefaultShippingAddressAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
} from '@commercetools/platform-sdk';

import type { AddressIdentificationPayload } from '../types';

export const createSetFirstNameAction = (firstName: string): MyCustomerSetFirstNameAction => ({
  action: 'setFirstName',
  firstName,
});

export const createSetLastNameAction = (lastName: string): MyCustomerSetLastNameAction => ({
  action: 'setLastName',
  lastName,
});

export const createChangeEmailAction = (email: string): MyCustomerChangeEmailAction => ({
  action: 'changeEmail',
  email,
});

export const createSetDateOfBirthAction = (
  dateOfBirth: string,
): MyCustomerSetDateOfBirthAction => ({
  action: 'setDateOfBirth',
  dateOfBirth,
});

export const createAddAddressAction = (address: BaseAddress): MyCustomerAddAddressAction => ({
  action: 'addAddress',
  address,
});

export const createAddShippingAddressIdAction = (
  payload: AddressIdentificationPayload,
): MyCustomerAddShippingAddressIdAction => ({
  action: 'addShippingAddressId',
  addressId: payload.id,
  addressKey: payload.key,
});

export const createAddBillingAddressIdAction = (
  payload: AddressIdentificationPayload,
): MyCustomerAddBillingAddressIdAction => ({
  action: 'addBillingAddressId',
  addressId: payload.id,
  addressKey: payload.key,
});

export const createRemoveAddressAction = (addressId?: string): MyCustomerRemoveAddressAction => ({
  action: 'removeAddress',
  addressId,
});

export const createChangeAddressAction = (payload: {
  address: BaseAddress;
  addressId?: string;
}): MyCustomerChangeAddressAction => ({
  action: 'changeAddress',
  address: payload.address,
  addressId: payload.addressId,
});

export const createSetDefaultShippingAddressAction = (
  payload: AddressIdentificationPayload,
): MyCustomerSetDefaultShippingAddressAction => ({
  action: 'setDefaultShippingAddress',
  addressId: payload.id,
  addressKey: payload.key,
});

export const createSetDefaultBillingAddressAction = (
  payload: AddressIdentificationPayload,
): MyCustomerSetDefaultBillingAddressAction => ({
  action: 'setDefaultBillingAddress',
  addressId: payload.id,
  addressKey: payload.key,
});

export const createRemoveShippingAddressIdAction = (
  addressId?: string,
): MyCustomerRemoveShippingAddressIdAction => ({
  action: 'removeShippingAddressId',
  addressId,
});

export const createRemoveBillingAddressIdAction = (
  addressId?: string,
): MyCustomerRemoveBillingAddressIdAction => ({
  action: 'removeBillingAddressId',
  addressId,
});
