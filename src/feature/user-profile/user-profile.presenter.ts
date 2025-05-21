import type { CustomerService } from '~/api/services/customer/customer.service';
import type {
  AppChangePasswordPayload,
  AppCustomer,
  PersonalDataPayload,
} from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';

import type { UserProfileView } from './user-profile.view';

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
    this.view.bindPasswordChangeHandler(this.handlePasswordChange);
  }

  private readonly handlePasswordChange = async (
    payload: AppChangePasswordPayload,
  ): Promise<void> => {
    try {
      const updatedCustomer = await this.customerService.changePassword(payload);
      this.updateView(updatedCustomer);
    } catch (error: unknown) {
      console.warn(error);
    }
  };

  private readonly handlePersonalDataUpdate = async (
    payload: PersonalDataPayload,
  ): Promise<void> => {
    try {
      const updatedCustomer = await this.customerService.updatePersonalData(payload);
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
    this.view.createHTML(userInformation);
  }
}
