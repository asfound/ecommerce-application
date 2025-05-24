import { rootSelector } from '~/app/store/selectors';
import { rootStore } from '~/app/store/store';
import { BaseComponent } from '~/components/base-component/base-component';

import type { RoutePath } from '../types';

import { Router } from '../router';
import { routerSelector } from '../store/selectors';
import { routerStore } from '../store/store';
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

    routerStore.subscribe(routerSelector.selectPathname, (pathname) => {
      if (this.properties.path === pathname) {
        this.addClassNames(styles.active);
      } else {
        this.removeClassNames(styles.active);
      }
    });

    rootStore.subscribe(rootSelector.selectLoggedIn, (loggedIn) => {
      if (
        loggedIn &&
        (this.properties.path === '/login' || this.properties.path === '/registration')
      ) {
        this.addClassNames(styles.hidden);
      } else {
        this.removeClassNames(styles.hidden);
      }
    });
  }
}
