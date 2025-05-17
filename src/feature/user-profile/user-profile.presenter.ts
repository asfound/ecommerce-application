import type { CustomerService } from '~/api/services/customer/customer.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserProfileView } from './user-profile.view';

export class UserProfilePresenter extends Presenter<UserProfileView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserProfileView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    console.warn(this.customerService);
  }
}
