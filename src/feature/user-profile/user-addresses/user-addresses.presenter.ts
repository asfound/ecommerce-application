import type { CustomerService } from '~/api/services/customer/customer.service';
import type { AppChangeAddressPayload, AppCustomer } from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserAddressesView } from './user-addresses.view';

export class UserAddressesPresenter extends Presenter<UserAddressesView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserAddressesView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.initView();
  }

  private readonly handleAddressChange = async (
    payload: AppChangeAddressPayload,
  ): Promise<void> => {
    try {
      const updatedCustomer = await this.customerService.changeAddress(payload);
      this.updateView(updatedCustomer);
    } catch (error: unknown) {
      console.warn(error);
    }
  };

  private async initView(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

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
