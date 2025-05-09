import { RouterLink, type RouterLinkProperties } from '~/app/router/components/router-link';

import { BaseComponent } from '../base-component/base-component';
import styles from './navigation.module.css';
export class Navigation extends BaseComponent {
  public constructor(links: RouterLinkProperties[]) {
    super({ className: styles.navigation, tagName: 'nav' });

    this.append(...links.map((link) => new RouterLink(link)));
  }
}
