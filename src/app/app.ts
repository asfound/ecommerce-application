import { BaseComponent } from '~/components/base-component/base-component';

import { Router } from './router/router';
import { FALLBACK_ROUTE, ROUTES } from './router/routes';

export class App {
  private readonly root = new BaseComponent({ className: 'app', tagName: 'div' });

  public constructor() {
    Router.initialize(ROUTES, FALLBACK_ROUTE);

    this.root.append(Router.instance.outlet);
  }

  public mount(parent: HTMLElement): void {
    parent.append(this.root.element);
  }
}
