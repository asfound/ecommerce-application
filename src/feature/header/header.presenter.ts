import type { AuthService } from '~/api/services/auth/auth.service';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { rootAction } from '~/app/store/actions';
import { rootSelector } from '~/app/store/selectors';
import { rootStore } from '~/app/store/store';
import { Presenter } from '~/shared/presenter/presenter';

import type { HeaderView } from './header.view';

export class HeaderPresenter extends Presenter<HeaderView> {
  private readonly authService: AuthService;

  public constructor(view: HeaderView, authService: AuthService) {
    super(view);

    this.authService = authService;

    this.bindViewHandlers();

    this.setupSubscriptions();
  }

  private bindViewHandlers(): void {
    this.view.bindCartClickHandler(this.handleCartClick);
    this.view.bindLogoutHandler(this.handleLogout);
    this.view.bindLogoClickHandler(this.handleLogoClick);
    this.view.bindProfileClickHandler(this.handleProfileClick);
  }

  private readonly handleCartClick = (): void => {
    Router.instance.navigate(ROUTE_PATH.CART);
  };

  private readonly handleLogoClick = (): void => {
    Router.instance.navigate(ROUTE_PATH.MAIN);
  };

  private readonly handleLogout = (): void => {
    this.authService.logout();

    Router.instance.navigate(ROUTE_PATH.LOGIN);

    rootAction.setLoggedIn(false);
  };

  private readonly handleProfileClick = (): void => {
    Router.instance.navigate(ROUTE_PATH.PROFILE);
  };

  private setupSubscriptions(): void {
    this.subscribeLoggedIn();
  }

  private subscribeLoggedIn(): void {
    const unsubscribe = rootStore.subscribe(rootSelector.selectLoggedIn, (loggedIn) => {
      this.view.setLogoutIconVisible(loggedIn);
      this.view.setProfileIconVisible(loggedIn);
    });

    this.storeSubscription.add(unsubscribe);
  }
}
