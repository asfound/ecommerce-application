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
  addressKey: ReturnType<typeof crypto.randomUUID>,
): MyCustomerAddShippingAddressIdAction => ({
  action: 'addShippingAddressId',
  addressKey,
});

export const createAddBillingAddressIdAction = (
  addressKey: ReturnType<typeof crypto.randomUUID>,
): MyCustomerAddBillingAddressIdAction => ({
  action: 'addBillingAddressId',
  addressKey,
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

export const createSetDefaultShippingAddressAction = (payload: {
  id?: string;
  key?: string;
}): MyCustomerSetDefaultShippingAddressAction => ({
  action: 'setDefaultShippingAddress',
  addressId: payload.id,
  addressKey: payload.key,
});

export const createSetDefaultBillingAddressAction = (payload: {
  id?: string;
  key?: string;
}): MyCustomerSetDefaultBillingAddressAction => ({
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
