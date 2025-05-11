import { rootSelector } from '~/app/store/selectors';
import { rootStore } from '~/app/store/store';
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

    // TODO: Temporary solution. It is not clear yet how to make it better. Maybe we can come up with something better
    rootStore.subscribe(rootSelector.selectLoggedIn, (loggedIn) => {
      if (loggedIn && this.properties.path === '/login') {
        this.addClassNames(styles.disabled);
      } else {
        this.removeClassNames(styles.disabled);
      }
    });
  }
}
