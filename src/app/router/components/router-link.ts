import { BaseComponent } from '~/components/base-component/base-component';

import type { RoutePath } from '../types';

import { Router } from '../router';
import styles from './router-link.module.css';

export interface RouterLinkProperties {
  path: RoutePath;
  textContent: string;
}

export class RouterLink extends BaseComponent<HTMLAnchorElement> {
  public constructor(properties: RouterLinkProperties) {
    super({
      attributes: { href: properties.path },
      className: styles.link,
      tagName: 'a',
      textContent: properties.textContent,
    });

    this.addListener('click', (event) => {
      event.preventDefault();

      Router.instance.navigate(properties.path).catch(console.error);
    });
  }
}
