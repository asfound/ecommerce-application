import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { RegistrationFormPresenter } from '~/feature/registration-form/registration-form.presenter';
import { RegistrationFormView } from '~/feature/registration-form/registration-form.view';

export class RegistrationPage extends BaseComponent {
  private readonly registrationFormPresenter;

  public constructor() {
    super({ tagName: 'div' });

    const authService = SERVICE_HUB.provideAuthService();

    this.registrationFormPresenter = new RegistrationFormPresenter(
      new RegistrationFormView(),
      authService,
    );

    this.append(this.registrationFormPresenter.getView());
  }

  public override destroy(): void {
    this.registrationFormPresenter.destroy();

    super.destroy();
  }
}
