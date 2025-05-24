import type { AuthService } from '~/api/services/auth/auth.service';
import type { SignupPayload } from '~/api/services/auth/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';
import { showToast } from '~/shared/utils/show-toast';

import type { RegistrationFormView } from './registration-form.view';

import { REGISTRATION_FORM_TEXT } from './constants';

export class RegistrationFormPresenter extends Presenter<RegistrationFormView> {
  private readonly authService: AuthService;

  public constructor(view: RegistrationFormView, authService: AuthService) {
    super(view);

    this.authService = authService;

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindSubmitHandler(this.handleSignUp);
    this.view.bindRegistrationLinkHandler(this.handleLoginLinkClick);
  }

  private handleLoginLinkClick = (): void => {
    Router.instance.navigate(ROUTE_PATH.LOGIN);
    window.scrollTo({ top: 0 });
  };

  private readonly handleSignUp = (payload: SignupPayload): void => {
    this.authService
      .signup(payload)
      .then(() => {
        this.view.hideError();

        Router.instance.navigate(ROUTE_PATH.LOGIN);

        showToast(REGISTRATION_FORM_TEXT.ACCOUNT_CREATED);
      })
      .catch((error: unknown) => {
        if (isError(error)) {
          this.view.showError(error.message);
        }
      })
      .finally(() => {
        window.scrollTo({ top: 0 });
      });
  };
}
