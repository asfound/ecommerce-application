import type { CustomerService } from '~/api/services/customer/customer.service';
import type { AppCustomer, PersonalDataPayload } from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserProfileView } from './user-profile.view';

export type PersonalDataUpdateHandler = (payload: PersonalDataPayload) => void;

export class UserProfilePresenter extends Presenter<UserProfileView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserProfileView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.initView();

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindPersonalDataUpdateHandler(this.handlePersonalDataUpdate);
  }

  private readonly handlePersonalDataUpdate = (payload: PersonalDataPayload): void => {
    this.customerService
      .updatePersonalData(payload)
      .then((updatedCustomer) => {
        this.updateView(updatedCustomer);
      })
      .catch((error: unknown) => {
        console.warn(error);
      });
  };

  private async initView(): Promise<void> {
    const userInformation = await this.customerService.getCustomer();

    this.updateView(userInformation);
  }

  private updateView(userInformation: AppCustomer): void {
    this.view.createHTML(userInformation);
  }
}
