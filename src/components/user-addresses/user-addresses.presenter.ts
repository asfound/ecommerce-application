import type { CustomerService } from '~/api/services/customer/customer.service';
import type { AppCustomer } from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserAddressesView } from './user-addresses.view';

export class UserAddressesPresenter extends Presenter<UserAddressesView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserAddressesView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.initView();
  }

  private async initView(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

    this.updateView(userInformation);
  }

  private updateView(userInformation: AppCustomer): void {
    this.view.createHTML({
      billingAddresses: userInformation.billingAddresses,
      shippingAddresses: userInformation.shippingAddresses,
    });
  }
}
