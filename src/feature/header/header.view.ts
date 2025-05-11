import type { Component } from '~/components/base-component/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { ROUTER_LINKS } from '~/app/router/router-links';
import { BaseComponent } from '~/components/base-component/base-component';
import { Logo } from '~/components/logo/logo';
import { Navigation } from '~/components/navigation/navigation';
import { CSS_CLASS_NAME } from '~/shared/constants/constants';
import { a, div } from '~/shared/create-element/tags';


import styles from './header.module.css';

export class HeaderView extends BaseComponent implements Component {
  private readonly logoLink = a({ className: styles.logoLink, href: ROUTE_PATH.MAIN });

  // TODO: change to icon
  private readonly logoutIcon = div({ className: styles.icon }, 'Logout');

  public constructor() {
    super({ className: styles.header, tagName: 'header' });

    this.createHTML();
  }

  public bindLogoClickHandler(handler: VoidFunction): void {
    this.logoLink.addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public bindLogoutHandler(handler: VoidFunction): void {
    this.logoutIcon.addEventListener(
      'click',
      () => {
        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public createHTML(): void {
    const logoElement = new Logo();
    this.logoLink.append(logoElement.element);

    const navigation = new Navigation(ROUTER_LINKS);

    // TODO: change to icons
    const cart = div({}, 'Cart');

    const container = div({ className: styles.container }, cart, this.logoutIcon);

    const wrapperElement = div(
      { className: [CSS_CLASS_NAME.WRAPPER, styles.wrapper] },
      logoLink.element,
      navigation.element,
      container,
    );

    this.append(wrapperElement);
  }

  public setLogoutIconVisible(visible: boolean): void {
    this.logoutIcon.hidden = !visible;
  }
}
