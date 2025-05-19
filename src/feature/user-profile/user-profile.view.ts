import type {
  AppCustomer,
  AppCustomerAddress,
  PersonalDataPayload,
} from '~/api/services/customer/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { UserAddress } from '~/components/user-address/user-address';
import { UserDetails } from '~/components/user-details/user-details';
import { div, h1, li, ul } from '~/shared/create-element/tags';

import { HEADING, NAV_ITEMS, TITLE } from './constants';
import styles from './user-profile.module.css';

export class UserProfileView extends BaseComponent implements Component {
  private readonly contentBlocks: HTMLDivElement[] = [];

  private readonly navigationItems: HTMLLIElement[] = [];

  private readonly userDetails = new UserDetails();

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public bindPersonalDataUpdateHandler(handler: (payload: PersonalDataPayload) => void): void {
    this.userDetails.bindSubmitHandler(handler);
  }

  public createHTML(userInformation: AppCustomer): void {
    const navigationBlock = div(
      { className: [styles.block, styles.navigationBlock] },
      h1({ className: styles.heading }, HEADING),
      this.createNavigation(),
    );

    const informationContent = this.createPersonalInformation(userInformation);
    const addressesContent = this.createAddresses(
      userInformation.shippingAddresses,
      userInformation.billingAddresses,
    );

    this.contentBlocks.push(informationContent, addressesContent);

    const contentBlock = div(
      { className: [styles.block, styles.contentBlock] },
      informationContent,
      addressesContent,
    );

    this.append(navigationBlock, contentBlock);
  }

  private createAddresses(
    shippingAddresses: AppCustomerAddress[],
    billingAddresses: AppCustomerAddress[],
  ): HTMLDivElement {
    const shippingCol = div(
      { className: styles.addressCol },
      div({ className: styles.title }, TITLE.SHIPPING),
    );
    const billingCol = div(
      { className: styles.addressCol },
      div({ className: styles.title }, TITLE.BILLING),
    );

    if (shippingAddresses.length > 0) {
      for (const address of shippingAddresses) {
        const userAddress = new UserAddress(address);
        shippingCol.append(userAddress.element);
      }
    }

    if (billingAddresses.length > 0) {
      for (const address of billingAddresses) {
        const userAddress = new UserAddress(address);
        billingCol.append(userAddress.element);
      }
    }

    const addressesContainer = div({ className: styles.addresses }, shippingCol, billingCol);

    return div({ className: styles.content, id: NAV_ITEMS.ADDRESSES.ID }, addressesContainer);
  }

  private createNavigation(): HTMLUListElement {
    const informationItem = li(
      { className: [styles.navigationItem, styles.active] },
      NAV_ITEMS.INFORMATION.TEXT,
    );
    const addressesItem = li({ className: styles.navigationItem }, NAV_ITEMS.ADDRESSES.TEXT);

    informationItem.dataset.target = NAV_ITEMS.INFORMATION.ID;
    addressesItem.dataset.target = NAV_ITEMS.ADDRESSES.ID;

    this.navigationItems.push(informationItem, addressesItem);

    for (const item of this.navigationItems) {
      item.addEventListener('click', () => {
        this.handleNavigationClick(item);
      });
    }

    return ul(null, informationItem, addressesItem);
  }

  private createPersonalInformation(userInformation: AppCustomer): HTMLDivElement {
    this.userDetails.createHTML(userInformation);

    return div(
      { className: [styles.content, styles.visible], id: NAV_ITEMS.INFORMATION.ID },
      div({ className: styles.title }, TITLE.PERSONAL),
      this.userDetails.element,
    );
  }

  private handleNavigationClick(item: HTMLLIElement): void {
    const targetId = item.dataset.target;

    for (const navItem of this.navigationItems) {
      navItem.classList.toggle(styles.active, navItem === item);
    }

    for (const block of this.contentBlocks) {
      block.classList.toggle(styles.visible, block.id === targetId);
    }
  }
}
