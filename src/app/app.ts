import { isString } from 'lodash';

import { ApiBuilder } from '~/api/client/api-builder';
import { SERVICE_PROVIDER } from '~/api/services/service-provider';
import { BaseComponent } from '~/components/base-component/base-component';
import { Footer } from '~/feature/footer/footer';
import { HeaderPresenter } from '~/feature/header/header.presenter';
import { HeaderView } from '~/feature/header/header.view';
import { normalizeError } from '~/shared/utils/normalize-error';
import { showToast } from '~/shared/utils/show-toast';

import styles from './app.module.css';
import { APP_ERROR_MESSAGE } from './constants';
import { Router } from './router/router';
import { FALLBACK_ROUTE, ROUTES } from './router/routes';
import { rootAction } from './store/actions';

export class App {
  private readonly root = new BaseComponent({ className: styles.app, tagName: 'div' });

  public async initialize(): Promise<void> {
    Router.initialize(ROUTES, FALLBACK_ROUTE);
    ApiBuilder.instance.initialize();

    const authService = SERVICE_PROVIDER.provideAuthService();
    const cartService = SERVICE_PROVIDER.provideCartService();

    try {
      const { body } = await cartService.getCurrentCart();

      rootAction.setProductsCount(body.totalLineItemQuantity ?? 0);
      rootAction.setLoggedIn(authService.isLoggedIn());

      const headerPresenter = new HeaderPresenter(new HeaderView(), authService);

      const footer = new Footer();

      this.root.append(headerPresenter.getView(), Router.instance.outlet, footer);
    } catch (error) {
      showToast(normalizeError(error).message, true);

      throw new Error(APP_ERROR_MESSAGE.FAILED_TO_INITIALIZE);
    }
  }

  public initializeListeners(): void {
    globalThis.addEventListener('unhandledrejection', (event) => {
      event.preventDefault();
      const message = isString(event.reason) ? event.reason : normalizeError(event.reason).message;
      showToast(message, true);
    });
  }

  public mount(parent: HTMLElement): void {
    parent.append(this.root.element);
  }
}
