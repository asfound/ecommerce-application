import type { BaseAddress, Customer } from '@commercetools/platform-sdk';

import type { ADDRESS_TYPE } from './constants';

export interface AddAddressPayload {
  address: BaseAddress;
  customerVersion: number;
  default: boolean;
  type: 'billing' | 'shipping';
}

export interface AddressIdentificationPayload {
  id?: string;
  key?: string;
}

export interface AddressPayload {
  addressId?: string;
  addressKey?: string;
  customerVersion: number;
}

export type AddressType = (typeof ADDRESS_TYPE)[keyof typeof ADDRESS_TYPE];

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
  billing?: boolean;
  city: string;
  country: string;
  defaultBilling: boolean;
  defaultShipping: boolean;
  inBilling?: boolean;
  inShipping?: boolean;
  postalCode: string;
  shipping?: boolean;
  streetName: string;
}

export interface ChangeAddressPayload extends AddressPayload {
  address: BaseAddress;
}

export interface MapAddressesParameters {
  addresses: Customer['addresses'];
  addressIds?: string[];
  addressType: AddressType;
  allIds: {
    billingAddressIds?: string[];
    shippingAddressIds?: string[];
  };
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
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
