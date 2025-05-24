import type { CustomerService } from '~/api/services/customer/customer.service';
import type {
  AppChangeAddressPayload,
  AppCustomer,
  ChangeAddressPayload,
} from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserAddressesView } from './user-addresses.view';

export class UserAddressesPresenter extends Presenter<UserAddressesView> {
  private readonly customerService: CustomerService;

  private customerVersion: null | number = null;

  public constructor(view: UserAddressesView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.init();
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

      this.customerVersion = updatedCustomer.version;
      this.updateView(updatedCustomer);
    } catch (error: unknown) {
      console.warn(error);
    }
  };

  private async init(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

    this.customerVersion = userInformation.version;

    this.updateView(userInformation);
  }

  private updateView(userInformation: AppCustomer): void {
    console.warn(userInformation);
    this.view.createHTML(
      {
        billingAddresses: userInformation.billingAddresses,
        shippingAddresses: userInformation.shippingAddresses,
      },
      this.handleAddressChange,
    );
  }
}
