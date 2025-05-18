import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { UserProfilePresenter } from '~/feature/user-profile/user-profile.presenter';
import { UserProfileView } from '~/feature/user-profile/user-profile.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';

export class UserProfilePage extends BaseComponent {
  private readonly userProfilePresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER], tagName: 'div' });

    const customerService = SERVICE_HUB.provideCustomerService();

    this.userProfilePresenter = new UserProfilePresenter(new UserProfileView(), customerService);

    this.append(this.userProfilePresenter.getView());
  }

  public override destroy(): void {
    this.userProfilePresenter.destroy();

    super.destroy();
  }
}
