import type { BaseAddress, Customer } from '@commercetools/platform-sdk';

export interface AddAddressPayload {
  address: BaseAddress;
  customerVersion: number;
}

export interface AddressPayload {
  addressId: string;
  customerVersion: number;
}

export interface AppCustomer {
  billingAddresses: AppCustomerAddress[];
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  shippingAddresses: AppCustomerAddress[];
  version: number;
}

export interface AppCustomerAddress {
  city: string;
  country: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
  postalCode: string;
  streetName: string;
}

export interface ChangeAddressPayload extends AddressPayload {
  address: BaseAddress;
}

export interface PersonalDataPayload {
  editedCustomer: Customer;
  sourceCustomer: Customer;
}
