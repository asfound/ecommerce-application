import type { AuthService } from '~/api/services/auth/auth.service';

import { Presenter } from '~/shared/presenter/presenter';

import type { LoginFormView } from './login-form.view';

export class LoginFormPresenter<
  T extends LoginFormView = LoginFormView,
> extends Presenter<LoginFormView> {
  private readonly authService: AuthService;

  public constructor(view: T, authService: AuthService) {
    super(view);

    this.authService = authService;

    console.warn(this.authService);
  }
}
