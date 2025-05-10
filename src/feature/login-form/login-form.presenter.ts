import type { AuthService } from '~/api/services/auth/auth.service';
import type { LoginPayload } from '~/api/services/auth/types';

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
  }

  private handleLogin = (payload: LoginPayload): void => {
    this.authService
      .login(payload)
      .then(({ body }) => {
        this.view.hideError();
        console.warn('login success:', body);
      })
      .catch((error: unknown) => {
        if (isError(error)) {
          this.view.showError(error.message);
        }
      });
  };
}
