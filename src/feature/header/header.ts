import type { Component } from '~/components/base-component/types';

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
    const logo = new Logo();

    const navigation = new Navigation(ROUTER_LINKS);

    // TODO: change to icon
    const cart = new BaseComponent({ tagName: 'div', textContent: 'Cart' });

    this.append(logo, navigation, cart);
  }
}
