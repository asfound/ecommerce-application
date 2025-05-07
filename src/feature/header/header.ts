import type { Component } from '~/components/base-component/types';

import { RouterLink } from '~/app/router/components/router-link';
import { ROUTE_PATH } from '~/app/router/route-path';
import { ROUTER_LINKS } from '~/app/router/router-links';
import { BaseComponent } from '~/components/base-component/base-component';
import { Logo } from '~/components/logo/logo';
import { Navigation } from '~/components/navigation/navigation';

import styles from './header.module.css';

export class Header extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.header, tagName: 'header' });

    this.createHTML();
  }

  public createHTML(): void {
    const logo = this.createLinkedLogo();
    const navigation = new Navigation(ROUTER_LINKS);

    // TODO: change to icon
    const cart = new BaseComponent({ tagName: 'div', textContent: 'Cart' });

    this.append(logo, navigation, cart);
  }

  private createLinkedLogo(): RouterLink {
    const link = new RouterLink({ path: ROUTE_PATH.MAIN });
    const logo = new Logo();

    link.element.append(logo.element);

    return link;
  }
}
