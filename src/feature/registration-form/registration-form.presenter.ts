import type { AuthService } from '~/api/services/auth/auth.service';
import type { SignupPayload } from '~/api/services/auth/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { rootAction } from '~/app/store/actions';
import { Presenter } from '~/shared/presenter/presenter';
import { showToast } from '~/shared/utils/show-toast';

import type { RegistrationFormView } from './registration-form.view';

export class RegistrationFormPresenter extends Presenter<RegistrationFormView> {
  private readonly authService: AuthService;

  public constructor(view: RegistrationFormView, authService: AuthService) {
    super(view);

    this.authService = authService;

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindSubmitHandler(this.handleSignUp);
  }

  private readonly handleSignUp = (payload: SignupPayload): void => {
    this.authService
      .signup(payload)
      .then(() => {
        return { email: payload.email, password: payload.password };
      })
      .then((credentials) => {
        return this.authService.login(credentials);
      })
      .then(() => {
        Router.instance.navigate(ROUTE_PATH.MAIN);

        rootAction.setLoggedIn(true);

        showToast('Account successfully created!');
      })
      .catch((error: unknown) => {
        console.warn(error);
      });
  };
}
