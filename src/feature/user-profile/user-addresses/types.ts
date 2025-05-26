import type { AppChangeAddressPayload, AppCustomerAddress } from '~/api/services/customer/types';

export interface AddressCallbacks {
  onAddressChange(payload: AppChangeAddressPayload): Promise<void>;
  onAddressDeletion(payload: string): Promise<void>;
  onBillingDefaultToggle(payload: string, checked: boolean): Promise<void>;
  onShippingDefaultToggle(payload: string, checked: boolean): Promise<void>;
}

export interface AddressesData {
  billingAddresses: AppCustomerAddress[];
  shippingAddresses: AppCustomerAddress[];
}
