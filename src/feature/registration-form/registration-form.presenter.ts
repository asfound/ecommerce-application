import type { AuthService } from '~/api/services/auth/auth.service';
import type { SignupPayload } from '~/api/services/auth/types';

import { Presenter } from '~/shared/presenter/presenter';

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

  private handleSignUp = (payload: SignupPayload): void => {
    console.warn(this.authService, payload);
  };
}
