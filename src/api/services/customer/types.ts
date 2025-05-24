import type { BaseAddress } from '@commercetools/platform-sdk';

export interface AddAddressPayload {
  address: BaseAddress;
  customerVersion: number;
  default: boolean;
  type: 'billing' | 'shipping';
}

export interface AddressPayload {
  addressId?: string;
  addressKey?: string;
  customerVersion: number;
}

export interface AppChangeAddressPayload extends Omit<AddressPayload, 'customerVersion'> {
  address: BaseAddress;
}

export interface AppChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
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
  addressId: string;
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

export interface PersonalData {
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  version: number;
}

export interface PersonalDataPayload {
  editedCustomer: PersonalData;
  sourceCustomer: PersonalData;
}
