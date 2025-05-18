import type { MyCustomerDraft } from '@commercetools/platform-sdk';

export interface AppCustomerDraft extends MyCustomerDraft {
  billingAddresses?: number[];
  shippingAddresses?: number[];
}

export interface CustomerAddress {
  city: string;
  country: string;
  default: boolean;
  postalCode: string;
  streetName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  addresses: {
    billingAddress?: CustomerAddress;
    shippingAddress: CustomerAddress;
    shippingAsBilling: boolean;
  };
  dateOfBirth: string; // TODO: maybe change
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
