import { ApiBuilder } from '~/api/client/api-builder';
import { SERVICE_HUB } from '~/api/services/service-hub';
import { BaseComponent } from '~/components/base-component/base-component';
import { HeaderPresenter } from '~/feature/header/header.presenter';
import { HeaderView } from '~/feature/header/header.view';

import styles from './app.module.css';
import { Router } from './router/router';
import { FALLBACK_ROUTE, ROUTES } from './router/routes';
import { rootAction } from './store/actions';

export class App {
  private readonly root = new BaseComponent({ className: styles.app, tagName: 'div' });

  public constructor() {
    Router.initialize(ROUTES, FALLBACK_ROUTE);
    ApiBuilder.instance.initialize();

    const authService = SERVICE_HUB.provideAuthService();

    rootAction.setLoggedIn(authService.isLoggedIn());

    const headerPresenter = new HeaderPresenter(new HeaderView(), authService);

    this.root.append(headerPresenter.getView(), Router.instance.outlet);
  }

  public mount(parent: HTMLElement): void {
    parent.append(this.root.element);
  }
}
