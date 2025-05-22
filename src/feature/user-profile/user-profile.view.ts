import type { Component } from '~/components/base-component/types';

import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { UserAddressesPresenter } from '~/components/user-addresses/user-addresses.presenter';
import { UserAddressesView } from '~/components/user-addresses/user-addresses.view';
import { UserDetailsPresenter } from '~/components/user-details/user-details.presenter';
import { UserDetailsView } from '~/components/user-details/user-details.view';
import { UserPasswordChangePresenter } from '~/components/user-password-change/user-password-change.presenter';
import { UserPasswordChangeView } from '~/components/user-password-change/user-password-change.view';
import { div, h1, li, ul } from '~/shared/create-element/tags';

import { HEADING, NAV_ITEMS } from './constants';
import styles from './user-profile.module.css';

export class UserProfileView extends BaseComponent implements Component {
  private readonly contentBlock: HTMLDivElement = div({
    className: [styles.block, styles.contentBlock],
  });

  private readonly navigationItems: HTMLLIElement[] = [];

  private readonly userAddressesPresenter;

  private readonly userDetailsPresenter;

  private readonly userPasswordChangePresenter;

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    const customerService = SERVICE_HUB.provideCustomerService();

    this.userDetailsPresenter = new UserDetailsPresenter(new UserDetailsView(), customerService);

    this.userPasswordChangePresenter = new UserPasswordChangePresenter(
      new UserPasswordChangeView(),
      customerService,
    );

    this.userAddressesPresenter = new UserAddressesPresenter(
      new UserAddressesView(),
      customerService,
    );

    this.createHTML();
  }

  public createHTML(): void {
    const navigationBlock = div(
      { className: [styles.block, styles.navigationBlock] },
      h1({ className: styles.heading }, HEADING),
      this.createNavigationList(),
    );

    this.showInfoBlock();

    this.append(navigationBlock, this.contentBlock);
  }

  private createNavigationList(): HTMLUListElement {
    const informationItem = li(
      { className: [styles.navigationItem, styles.active] },
      NAV_ITEMS.INFORMATION.TITLE,
    );

    informationItem.addEventListener('click', () => {
      this.showInfoBlock();
    });

    const passwordItem = li({ className: styles.navigationItem }, NAV_ITEMS.PASSWORD.TITLE);

    passwordItem.addEventListener('click', () => {
      this.showPasswordBlock();
    });

    const addressesItem = li({ className: styles.navigationItem }, NAV_ITEMS.ADDRESSES.TITLE);

    addressesItem.addEventListener('click', () => {
      this.showAddressesBlock();
    });

    this.navigationItems.push(informationItem, passwordItem, addressesItem);

    for (const item of this.navigationItems) {
      item.addEventListener('click', () => {
        this.handleNavigationClick(item);
      });
    }

    return ul(null, informationItem, passwordItem, addressesItem);
  }

  private handleNavigationClick(item: HTMLLIElement): void {
    for (const navItem of this.navigationItems) {
      navItem.classList.toggle(styles.active, navItem === item);
    }
  }

  private showAddressesBlock(): void {
    this.contentBlock.replaceChildren(
      div({ className: styles.title }, NAV_ITEMS.ADDRESSES.TITLE),
      this.userAddressesPresenter.getView().element,
    );
  }

  private showInfoBlock(): void {
    this.contentBlock.replaceChildren(
      div({ className: styles.title }, NAV_ITEMS.INFORMATION.TITLE),
      this.userDetailsPresenter.getView().element,
    );

    this.userDetailsPresenter.resetView();
  }

  private showPasswordBlock(): void {
    this.contentBlock.replaceChildren(
      div({ className: styles.title }, NAV_ITEMS.PASSWORD.TITLE),
      this.userPasswordChangePresenter.getView().element,
    );

    this.userPasswordChangePresenter.resetView();
  }
}
