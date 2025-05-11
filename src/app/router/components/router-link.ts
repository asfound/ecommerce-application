import { BaseComponent } from '~/components/base-component/base-component';

import type { RoutePath } from '../types';

import { Router } from '../router';
import styles from './router-link.module.css';

export interface RouterLinkProperties {
  path: RoutePath;
  textContent?: string;
}

export class RouterLink extends BaseComponent<HTMLAnchorElement> {
  private readonly properties: RouterLinkProperties;

  public constructor(properties: RouterLinkProperties) {
    super({
      attributes: { href: properties.path },
      className: styles.link,
      tagName: 'a',
      textContent: properties.textContent,
    });

    this.properties = properties;

    this.setupListeners();
  }

  private setupListeners(): void {
    this.addListener('click', (event) => {
      event.preventDefault();

      Router.instance.navigate(this.properties.path);
    });

    Router.instance.subscribePath((path) => {
      if (this.properties.path === path) {
        this.addClassNames(styles.active);
      } else {
        this.removeClassNames(styles.active);
      }
    });
  }
}
