import type { CustomerService } from '~/api/services/customer/customer.service';
import type {
  AddAddressPayload,
  AppChangeAddressPayload,
  AppCustomer,
  ChangeAddressPayload,
} from '~/api/services/customer/types';
import type { NewAddressFormData } from '~/components/new-address-form/new-address-form';

import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { UserAddressesView } from './user-addresses.view';

export class UserAddressesPresenter extends Presenter<UserAddressesView> {
  private readonly customerService: CustomerService;

  private customerVersion: null | number = null;

  public constructor(view: UserAddressesView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.init();

    console.warn(this.handleNewBillingAddress);
    console.warn(this.handleNewShippingAddress);
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
        type: 'billing',
      };

      const updatedCustomer = await this.customerService.addAddress(addNewShippingAddressPayload);

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
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
        type: 'shipping',
      };

      const updatedCustomer = await this.customerService.addAddress(addNewShippingAddressPayload);

      this.updateCustomerVersion(updatedCustomer.version);
      this.updateView(updatedCustomer);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
      }
    }
  };

  private async init(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

    this.updateCustomerVersion(userInformation.version);
    this.updateView(userInformation);
  }

  private updateCustomerVersion(newVersion: number): void {
    this.customerVersion = newVersion;
  }

  private updateView(userInformation: AppCustomer): void {
    this.view.createHTML(
      {
        billingAddresses: userInformation.billingAddresses,
        shippingAddresses: userInformation.shippingAddresses,
      },
      this.handleAddressChange,
      this.handleAddressDeletion,
    );
  }
}
