import { ApiBuilder } from '~/api/client/api-builder';
import { BaseComponent } from '~/components/base-component/base-component';
import { Header } from '~/feature/header/header';

import styles from './app.module.css';
import { Router } from './router/router';
import { FALLBACK_ROUTE, ROUTES } from './router/routes';

export class App {
  private readonly root = new BaseComponent({ className: styles.app, tagName: 'div' });

  public constructor() {
    Router.initialize(ROUTES, FALLBACK_ROUTE);
    ApiBuilder.instance.initialize();

    const header = new Header();

    this.root.append(header, Router.instance.outlet);
  }

  public mount(parent: HTMLElement): void {
    parent.append(this.root.element);
  }
}
