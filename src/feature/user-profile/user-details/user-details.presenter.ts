import { isError } from 'lodash';

import type { CustomerService } from '~/api/services/customer/customer.service';
import type { AppCustomer, PersonalDataPayload } from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';
import { showToast } from '~/shared/utils/show-toast';

import type { UserDetailsView } from './user-details.view';

import { USER_NOTIFICATION } from './constants';

export class UserDetailsPresenter extends Presenter<UserDetailsView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserDetailsView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.initView();

    this.bindViewHandlers();
  }

  public resetView(): void {
    this.view.resetView();
  }

  private bindViewHandlers(): void {
    this.view.bindDataUpdateHandler(this.handlePersonalDataUpdate);
  }

  private readonly handlePersonalDataUpdate = async (
    payload: PersonalDataPayload,
  ): Promise<void> => {
    try {
      const updatedCustomer = await this.customerService.updatePersonalData(payload);

      this.view.resetInputs();
      this.updateView(updatedCustomer);

      showToast(USER_NOTIFICATION.INFORMATION_SUCCESS);
    } catch (error: unknown) {
      if (isError(error)) {
        showToast(error.message, true);
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
