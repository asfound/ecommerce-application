import type { CustomerService } from '~/api/services/customer/customer.service';
import type {
  AddAddressPayload,
  AddressPayload,
  AppChangeAddressPayload,
  AppCustomer,
  AppCustomerAddress,
  ChangeAddressPayload,
} from '~/api/services/customer/types';
import type { NewAddressFormData } from '~/components/new-address-form/new-address-form';

import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { AddressTransitionKey } from './types';
import type { UserAddressesView } from './user-addresses.view';

import { ADDRESS_TRANSITION_KEY, USER_NOTIFICATION } from './constants';

export class UserAddressesPresenter extends Presenter<UserAddressesView> {
  private readonly customerService: CustomerService;

  private readonly ADDRESS_ACTION_MAP = new Map<
    AddressTransitionKey,
    (payload: AddressPayload) => Promise<AppCustomer>
  >([
    [
      ADDRESS_TRANSITION_KEY.BILLING_FALSE,
      async (p): Promise<AppCustomer> => await this.customerService.removeFromShipping(p),
    ],
    [
      ADDRESS_TRANSITION_KEY.BILLING_TRUE,
      async (p): Promise<AppCustomer> => await this.customerService.copyToShipping(p),
    ],
    [
      ADDRESS_TRANSITION_KEY.SHIPPING_FALSE,
      async (p): Promise<AppCustomer> => await this.customerService.removeFromBilling(p),
    ],
    [
      ADDRESS_TRANSITION_KEY.SHIPPING_TRUE,
      async (p): Promise<AppCustomer> => await this.customerService.copyToBilling(p),
    ],
  ]);

  private customerVersion: null | number = null;

  public constructor(view: UserAddressesView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.init();

    view.setupListeners(this.handleNewShippingAddress, this.handleNewBillingAddress);
  }

  public override destroy(): void {
    this.ADDRESS_ACTION_MAP.clear();

    super.destroy();
  }

  public async init(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

    this.updateCustomerVersion(userInformation.version);
    this.updateView(userInformation);
  }

  private getTransitionKey(
    address: AppCustomerAddress,
    checked: boolean,
  ): AddressTransitionKey | null {
    if (address.shipping) {
      return checked ? ADDRESS_TRANSITION_KEY.SHIPPING_TRUE : ADDRESS_TRANSITION_KEY.SHIPPING_FALSE;
    }

    if (address.billing) {
      return checked ? ADDRESS_TRANSITION_KEY.BILLING_TRUE : ADDRESS_TRANSITION_KEY.BILLING_FALSE;
    }

    return null;
  }

  private readonly handleAddressChange = async (
    payload: AppChangeAddressPayload,
  ): Promise<void> => {
    try {
      const changeAddressPayload: ChangeAddressPayload = {
        address: payload.address,
        addressId: payload.addressId,
        customerVersion: this.customerVersion ?? 0,
      };

      const updatedCustomer = await this.customerService.changeAddress(changeAddressPayload);

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
      showToast(USER_NOTIFICATION.CHANGE);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private readonly handleAddressDeletion = async (addressId: string): Promise<void> => {
    try {
      const updatedCustomer = await this.customerService.removeAddress({
        addressId,
        customerVersion: this.customerVersion ?? 0,
      });

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
      showToast(USER_NOTIFICATION.DELETE);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private readonly handleAddressTransitions = async (
    address: AppCustomerAddress,
    checked: boolean,
  ): Promise<void> => {
    try {
      const key = this.getTransitionKey(address, checked);

      if (!key) {
        return;
      }

      const action = this.ADDRESS_ACTION_MAP.get(key);

      if (!action) {
        return;
      }

      const updatedCustomer = await action({
        addressId: address.addressId,
        customerVersion: this.customerVersion ?? 0,
      });

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private readonly handleBillingToggle = async (id: string, checked: boolean): Promise<void> => {
    try {
      let updatedCustomer: AppCustomer;

      if (checked) {
        updatedCustomer = await this.customerService.setDefaultBillingAddress({
          addressId: id,
          customerVersion: this.customerVersion ?? 0,
        });

        this.updateCustomerVersion(updatedCustomer.version);
        this.updateView(updatedCustomer);
        showToast(USER_NOTIFICATION.SET_DEFAULT);
      } else {
        updatedCustomer = await this.customerService.unsetDefaultBillingAddress({
          addressId: id,
          customerVersion: this.customerVersion ?? 0,
        });

        this.updateCustomerVersion(updatedCustomer.version);
        this.updateView(updatedCustomer);
        showToast(USER_NOTIFICATION.UNSET_DEFAULT);
      }
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private readonly handleNewBillingAddress = async (payload: NewAddressFormData): Promise<void> => {
    try {
      const addNewShippingAddressPayload: AddAddressPayload = {
        address: payload.address,
        customerVersion: this.customerVersion ?? 0,
        default: payload.default,
        type: 'billing',
      };

      const updatedCustomer = await this.customerService.addAddress(addNewShippingAddressPayload);

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
      showToast(USER_NOTIFICATION.NEW);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private readonly handleNewShippingAddress = async (
    payload: NewAddressFormData,
  ): Promise<void> => {
    try {
      const addNewShippingAddressPayload: AddAddressPayload = {
        address: payload.address,
        customerVersion: this.customerVersion ?? 0,
        default: payload.default,
        type: 'shipping',
      };

      const updatedCustomer = await this.customerService.addAddress(addNewShippingAddressPayload);

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
      showToast(USER_NOTIFICATION.NEW);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private readonly handleShippingToggle = async (id: string, checked: boolean): Promise<void> => {
    try {
      let updatedCustomer: AppCustomer;

      if (checked) {
        updatedCustomer = await this.customerService.setDefaultShippingAddress({
          addressId: id,
          customerVersion: this.customerVersion ?? 0,
        });

        this.updateCustomerVersion(updatedCustomer.version);
        this.updateView(updatedCustomer);
        showToast(USER_NOTIFICATION.SET_DEFAULT);
      } else {
        updatedCustomer = await this.customerService.unsetDefaultShippingAddress({
          addressId: id,
          customerVersion: this.customerVersion ?? 0,
        });

        this.updateCustomerVersion(updatedCustomer.version);
        this.updateView(updatedCustomer);
        showToast(USER_NOTIFICATION.UNSET_DEFAULT);
      }
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private updateCustomerVersion(newVersion: number): void {
    this.customerVersion = newVersion;
  }

  private updateView(userInformation: AppCustomer): void {
    this.view.createHTML(
      {
        billingAddresses: userInformation.billingAddresses,
        shippingAddresses: userInformation.shippingAddresses,
      },
      {
        onAddressChange: this.handleAddressChange,
        onAddressDeletion: this.handleAddressDeletion,
        onAddressTransition: this.handleAddressTransitions,
        onBillingDefaultToggle: this.handleBillingToggle,
        onShippingDefaultToggle: this.handleShippingToggle,
      },
    );
  }
}
