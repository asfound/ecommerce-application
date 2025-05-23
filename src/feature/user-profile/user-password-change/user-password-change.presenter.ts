import { isError } from 'lodash';

import type { CustomerService } from '~/api/services/customer/customer.service';
import type { AppChangePasswordPayload } from '~/api/services/customer/types';

import { Presenter } from '~/shared/presenter/presenter';
import { showToast } from '~/shared/utils/show-toast';

import type { UserPasswordChangeView } from './user-password-change.view';

import { USER_NOTIFICATION } from '../user-details/constants';

export class UserPasswordChangePresenter extends Presenter<UserPasswordChangeView> {
  private readonly customerService: CustomerService;

  public constructor(view: UserPasswordChangeView, customerService: CustomerService) {
    super(view);

    this.customerService = customerService;

    this.bindViewHandlers();
  }

  public resetView(): void {
    this.view.createHTML();
  }

  private bindViewHandlers(): void {
    this.view.bindPasswordChangeHandler(this.handlePasswordChange);
  }

  private readonly handlePasswordChange = async (
    payload: AppChangePasswordPayload,
  ): Promise<void> => {
    try {
      await this.customerService.changePassword(payload);

      this.view.resetChanges();

      showToast(USER_NOTIFICATION.PASSWORD_SUCCESS);
    } catch (error: unknown) {
      if (isError(error)) {
        this.view.showError(error.message);
      }
    } finally {
      window.scrollTo({ top: 0 });
    }
  };
}
