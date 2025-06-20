import type { ProfileNavigationItemProperties } from '~/feature/user-profile/profile-navigation/profile-navigation.view';

import { SERVICE_PROVIDER } from '~/api/services/service-provider';
import { BaseComponent } from '~/components/base-component/base-component';
import { Loader } from '~/components/common/loader/loader';
import { HEADING, PROFILE_NAVIGATION_ITEMS } from '~/feature/user-profile/constants';
import { ProfileNavigationPresenter } from '~/feature/user-profile/profile-navigation/profile-navigation.presenter';
import { ProfileNavigationView } from '~/feature/user-profile/profile-navigation/profile-navigation.view';
import { UserAddressesPresenter } from '~/feature/user-profile/user-addresses/user-addresses.presenter';
import { UserAddressesView } from '~/feature/user-profile/user-addresses/user-addresses.view';
import { UserDetailsPresenter } from '~/feature/user-profile/user-details/user-details.presenter';
import { UserDetailsView } from '~/feature/user-profile/user-details/user-details.view';
import { UserPasswordChangePresenter } from '~/feature/user-profile/user-password-change/user-password-change.presenter';
import { UserPasswordChangeView } from '~/feature/user-profile/user-password-change/user-password-change.view';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { div, h1 } from '~/shared/create-element/tags';
import { normalizeError } from '~/shared/utils/normalize-error';
import { showToast } from '~/shared/utils/show-toast';

import styles from './user-page.module.css';

export class UserProfilePage extends BaseComponent {
  private readonly contentBlock: HTMLDivElement = div({
    className: [styles.block, styles.contentBlock],
  });

  private readonly loader = new Loader({ size: 'medium' });

  private readonly navigationItems: ProfileNavigationItemProperties[] = [
    {
      name: PROFILE_NAVIGATION_ITEMS.INFORMATION,
      onClick: (): void => {
        this.showInfoBlock();
      },
    },
    {
      name: PROFILE_NAVIGATION_ITEMS.PASSWORD,
      onClick: (): void => {
        this.showPasswordBlock();
      },
    },
    {
      name: PROFILE_NAVIGATION_ITEMS.ADDRESSES,
      onClick: (): void => {
        this.showAddressesBlock();
      },
    },
  ];

  private readonly profileNavigationPresenter: ProfileNavigationPresenter;

  private readonly userAddressesPresenter: UserAddressesPresenter;

  private readonly userDetailsPresenter: UserDetailsPresenter;

  private readonly userPasswordChangePresenter: UserPasswordChangePresenter;

  public constructor() {
    super({ className: [CSS_CLASS_NAME.WRAPPER, styles.container], tagName: 'div' });

    const customerService = SERVICE_PROVIDER.provideCustomerService();

    this.profileNavigationPresenter = new ProfileNavigationPresenter(
      new ProfileNavigationView(this.navigationItems),
    );

    this.userDetailsPresenter = new UserDetailsPresenter(new UserDetailsView(), customerService);

    this.userPasswordChangePresenter = new UserPasswordChangePresenter(
      new UserPasswordChangeView(),
      customerService,
    );

    this.userAddressesPresenter = new UserAddressesPresenter(
      new UserAddressesView(),
      customerService,
    );

    const navigationBlock = div(
      { className: [styles.block, styles.navigationBlock] },
      h1({ className: styles.heading }, HEADING),
      this.profileNavigationPresenter.getView().element,
    );

    this.showInfoBlock();

    this.append(navigationBlock, this.contentBlock);
  }

  public override destroy(): void {
    this.profileNavigationPresenter.destroy();
    this.userDetailsPresenter.destroy();
    this.userPasswordChangePresenter.destroy();
    this.profileNavigationPresenter.destroy();

    super.destroy();
  }

  private async showAddressesBlock(): Promise<void> {
    this.contentBlock.replaceChildren(this.loader.element);
    this.loader.show();

    try {
      await this.userAddressesPresenter.init();

      this.contentBlock.replaceChildren(
        div({ className: styles.title }, PROFILE_NAVIGATION_ITEMS.ADDRESSES),
        this.userAddressesPresenter.getView().element,
      );
    } catch (error) {
      showToast(normalizeError(error).message, true);
    } finally {
      this.loader.hide();
    }
  }

  private showInfoBlock(): void {
    this.contentBlock.replaceChildren(
      div({ className: styles.title }, PROFILE_NAVIGATION_ITEMS.INFORMATION),
      this.userDetailsPresenter.getView().element,
    );

    this.userDetailsPresenter.resetView();
  }

  private showPasswordBlock(): void {
    this.contentBlock.replaceChildren(
      div({ className: styles.title }, PROFILE_NAVIGATION_ITEMS.PASSWORD),
      this.userPasswordChangePresenter.getView().element,
    );

    this.userPasswordChangePresenter.resetView();
  }
}
