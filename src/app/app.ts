import { BaseComponent } from '~/components/base-component/base-component';
import { Navigation } from '~/components/navigation/navigation';

import type { RouterLinkProperties } from './router/components/router-link';

import { ROUTE_PATH } from './router/route-path';
import { Router } from './router/router';
import { FALLBACK_ROUTE, ROUTES } from './router/routes';

const ROUTER_LINKS: RouterLinkProperties[] = [
  { path: ROUTE_PATH.LOGIN, textContent: 'Login' },
  { path: ROUTE_PATH.REGISTRATION, textContent: 'Registration' },
  { path: ROUTE_PATH.MAIN, textContent: 'Main' },
];

export class App {
  private readonly root = new BaseComponent({ className: 'app', tagName: 'div' });

  public constructor() {
    Router.initialize(ROUTES, FALLBACK_ROUTE);

    const navigation = new Navigation(ROUTER_LINKS);

    this.root.append(navigation, Router.instance.outlet);
  }

  public mount(parent: HTMLElement): void {
    parent.append(this.root.element);
  }
}
