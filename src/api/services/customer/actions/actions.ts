import type {
  BaseAddress,
  MyCustomerAddAddressAction,
  MyCustomerAddBillingAddressIdAction,
  MyCustomerAddShippingAddressIdAction,
  MyCustomerChangeAddressAction,
  MyCustomerChangeEmailAction,
  MyCustomerRemoveAddressAction,
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

export const createRemoveAddressAction = (addressId: string): MyCustomerRemoveAddressAction => ({
  action: 'removeAddress',
  addressId,
});

export const createChangeAddressAction = (payload: {
  address: BaseAddress;
  addressId: string;
}): MyCustomerChangeAddressAction => ({
  action: 'changeAddress',
  address: payload.address,
  addressId: payload.addressId,
});

export const createSetDefaultShippingAddressAction = (
  addressId: string,
): MyCustomerSetDefaultShippingAddressAction => ({
  action: 'setDefaultShippingAddress',
  addressId,
});

export const createSetDefaultBillingAddressAction = (
  addressId: string,
): MyCustomerSetDefaultBillingAddressAction => ({
  action: 'setDefaultBillingAddress',
  addressId,
});
