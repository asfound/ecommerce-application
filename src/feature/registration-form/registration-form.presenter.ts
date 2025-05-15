import type { AuthService } from '~/api/services/auth/auth.service';
import type { SignupPayload } from '~/api/services/auth/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { rootAction } from '~/app/store/actions';
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
  };

  private readonly handleSignUp = (payload: SignupPayload): void => {
    this.authService
      .signup(payload)
      .then(() => {
        return { email: payload.email, password: payload.password };
      })
      .then((credentials) => {
        this.authService.logout();

        return this.authService.login(credentials);
      })
      .then(() => {
        this.view.hideError();

        Router.instance.navigate(ROUTE_PATH.MAIN);

        rootAction.setLoggedIn(true);

        showToast(REGISTRATION_FORM_TEXT.ACCOUNT_CREATED);
      })
      .catch((error: unknown) => {
        window.scrollTo({ top: 0 });

        if (isError(error)) {
          this.view.showError(error.message);
        }
      });
  };
}
