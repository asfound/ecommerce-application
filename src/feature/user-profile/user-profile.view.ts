import type { AppCustomer } from '~/api/services/customer/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { div, h1, li, ul } from '~/shared/create-element/tags';

import styles from './user-profile.module.css';

const PROFILE_NAVIGATION_TEXT = {
  ADDRESSES: 'Addresses',
  HEADING: 'Profile',
  PERSONAL: 'Personal information',
};

export class UserProfileView extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public createHTML(userInformation: AppCustomer): void {
    console.warn(userInformation);

    const navigation = ul(
      null,
      li({ className: styles.navigationItem }, PROFILE_NAVIGATION_TEXT.PERSONAL),
      li({ className: styles.navigationItem }, PROFILE_NAVIGATION_TEXT.ADDRESSES),
    );

    const navigationBlock = div(
      { className: [styles.block, styles.navigationBlock] },
      h1({ className: styles.heading }, PROFILE_NAVIGATION_TEXT.HEADING),
      navigation,
    );

    const informationBlock = div(
      { className: [styles.block, styles.informationBlock] },
      'Information',
    );

    this.append(navigationBlock, informationBlock);
  }
}
