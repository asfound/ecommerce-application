import { RouterLink, type RouterLinkProperties } from '~/app/router/components/router-link';

import { BaseComponent } from '../base-component/base-component';
import styles from './navigation.module.css';
export class Navigation extends BaseComponent {
  private readonly links: RouterLink[] = [];

  public constructor(links: RouterLinkProperties[]) {
    super({ className: styles.navigation, tagName: 'nav' });

    this.links = links.map((link) => new RouterLink(link));
    this.append(...this.links);
  }

  public addLinkClickHandler(handler: () => void): void {
    for (const link of this.links) {
      link.addListener('click', () => {
        handler();
      });
    }
  }
}
