import { SERVICE_PROVIDER } from '~/api/services/service-provider';
import { BaseComponent } from '~/components/base-component/base-component';
import { LoginFormPresenter } from '~/feature/login-form/login-form.presenter';
import { LoginFormView } from '~/feature/login-form/login-form.view';

export class LoginPage extends BaseComponent {
  private readonly loginFormPresenter;

  public constructor() {
    super({ tagName: 'div' });

    const authService = SERVICE_PROVIDER.provideAuthService();

    this.loginFormPresenter = new LoginFormPresenter(new LoginFormView(), authService);

    this.append(this.loginFormPresenter.getView());
  }

  public override destroy(): void {
    this.loginFormPresenter.destroy();

    super.destroy();
  }
}
