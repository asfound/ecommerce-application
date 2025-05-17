import type { AppCustomer } from '~/api/services/customer/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { div, h1, li, ul } from '~/shared/create-element/tags';

import { HEADING, NAV_ITEMS } from './constants';
import styles from './user-profile.module.css';

export class UserProfileView extends BaseComponent implements Component {
  private readonly contentBlocks: HTMLDivElement[] = [];

  private readonly navigationItems: HTMLLIElement[] = [];

  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public createHTML(userInformation: AppCustomer): void {
    console.warn(userInformation);

    const navigationBlock = div(
      { className: [styles.block, styles.navigationBlock] },
      h1({ className: styles.heading }, HEADING),
      this.createNavigation(),
    );

    const informationContent = div(
      { className: [styles.content, styles.visible], id: NAV_ITEMS.INFORMATION.ID },
      'Personal info',
    );

    const addressesContent = div(
      { className: styles.content, id: NAV_ITEMS.ADDRESSES.ID },
      'Addresses',
    );

    this.contentBlocks.push(informationContent, addressesContent);

    const contentBlock = div(
      { className: [styles.block, styles.contentBlock] },
      informationContent,
      addressesContent,
    );

    this.append(navigationBlock, contentBlock);
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
