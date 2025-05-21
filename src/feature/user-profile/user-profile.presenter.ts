import type { MyCustomerChangePassword } from '@commercetools/platform-sdk';

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

  private readonly handlePasswordChange = (payload: AppChangePasswordPayload): void => {
    this.customerService
      .getCustomer()
      .then((appCustomerData) => {
        const changePasswordPayload: MyCustomerChangePassword = {
          currentPassword: payload.currentPassword,
          newPassword: payload.newPassword,
          version: appCustomerData.version,
        };

        return this.customerService.changePassword(changePasswordPayload);
      })
      .then((updatedCustomer) => {
        this.updateView(updatedCustomer);
      })
      .catch((error: unknown) => {
        console.warn(error);
      });
  };

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
