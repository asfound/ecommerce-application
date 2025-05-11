import type { Component } from '~/components/base-component/types';

import { RouterLink } from '~/app/router/components/router-link';
import { ROUTE_PATH } from '~/app/router/route-path';
import { ROUTER_LINKS } from '~/app/router/router-links';
import { BaseComponent } from '~/components/base-component/base-component';
import { Logo } from '~/components/logo/logo';
import { Navigation } from '~/components/navigation/navigation';
import { div } from '~/shared/create-element/tags';

import styles from './header.module.css';

export class HeaderView extends BaseComponent implements Component {
  // TODO: change to icon
  private readonly logoutIcon = div({ className: styles.icon }, 'Logout');

  public constructor() {
    super({ className: styles.header, tagName: 'header' });

    this.createHTML();
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
    const logoLink = new RouterLink({ path: ROUTE_PATH.MAIN });
    const logoElement = new Logo();
    logoLink.append(logoElement);

    const navigation = new Navigation(ROUTER_LINKS);

    // TODO: change to icons
    const cart = div({}, 'Cart');

    const container = div({ className: styles.container }, cart, this.logoutIcon);

    this.append(logoLink, navigation, container);
  }

  public setLogoutIconVisible(visible: boolean): void {
    this.logoutIcon.hidden = !visible;
  }
}
