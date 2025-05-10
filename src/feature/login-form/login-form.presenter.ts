import type { AuthService } from '~/api/services/auth/auth.service';
import type { LoginPayload } from '~/api/services/auth/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { rootAction } from '~/app/store/actions';
import { Presenter } from '~/shared/presenter/presenter';
import { isError } from '~/shared/type-predicates/type-predicates';

import type { LoginFormView } from './login-form.view';

export class LoginFormPresenter extends Presenter<LoginFormView> {
  private readonly authService: AuthService;

  public constructor(view: LoginFormView, authService: AuthService) {
    super(view);

    this.authService = authService;

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindSubmitHandler(this.handleLogin);

    this.view.bindRegistrationLinkHandler(this.handleRegistrationLinkClick);
  }

  private handleLogin = (payload: LoginPayload): void => {
    this.authService
      .login(payload)
      .then(() => {
        this.view.hideError();

        Router.instance.navigate(ROUTE_PATH.MAIN);

        rootAction.setLoggedIn(true);
      })
      .catch((error: unknown) => {
        if (isError(error)) {
          this.view.showError(error.message);
        }
      });
  };

  private handleRegistrationLinkClick = (): void => {
    Router.instance.navigate(ROUTE_PATH.REGISTRATION);
  };
}
