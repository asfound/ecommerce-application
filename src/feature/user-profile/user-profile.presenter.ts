import type { CustomerService } from '~/api/services/customer/customer.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserProfileView } from './user-profile.view';

export class UserProfilePresenter extends Presenter<UserProfileView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserProfileView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.initView();
  }

  private async initView(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

    this.view.createHTML(userInformation);
  }
}
