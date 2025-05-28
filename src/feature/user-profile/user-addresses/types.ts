import type { AppChangeAddressPayload, AppCustomerAddress } from '~/api/services/customer/types';

import type { ADDRESS_TRANSITION_KEY } from './constants';

export interface AddressCallbacks {
  onAddressChange(payload: AppChangeAddressPayload): Promise<void>;
  onAddressDeletion(payload: string): Promise<void>;
  onAddressTransition(payload: AppCustomerAddress, checked: boolean): Promise<void>;
  onBillingDefaultToggle(payload: string, checked: boolean): Promise<void>;
  onShippingDefaultToggle(payload: string, checked: boolean): Promise<void>;
}

export interface AddressesData {
  billingAddresses: AppCustomerAddress[];
  shippingAddresses: AppCustomerAddress[];
}

export type AddressTransitionKey =
  (typeof ADDRESS_TRANSITION_KEY)[keyof typeof ADDRESS_TRANSITION_KEY];
