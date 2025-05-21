import type { CustomerService } from '~/api/services/customer/customer.service';
import type {
  AppChangePasswordPayload,
  AppCustomer,
  PersonalDataPayload,
} from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { UserProfileView } from './user-profile.view';

import { USER_NOTIFICATION } from './constants';

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
      showToast(USER_NOTIFICATION.PASSWORD_SUCCESS);
    } catch (error: unknown) {
      if (isError(error)) {
        this.view.showError(error.message);
      }
    } finally {
      window.scrollTo({ top: 0 });
    }
  };

  private readonly handlePersonalDataUpdate = async (
    payload: PersonalDataPayload,
  ): Promise<void> => {
    try {
      const updatedCustomer = await this.customerService.updatePersonalData(payload);
      this.updateView(updatedCustomer);
      showToast(USER_NOTIFICATION.PASSWORD_SUCCESS);
    } catch (error: unknown) {
      if (isError(error)) {
        this.view.showError(error.message);
      }
    } finally {
      window.scrollTo({ top: 0 });
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
