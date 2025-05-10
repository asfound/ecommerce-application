import type { AuthService } from '~/api/services/auth/auth.service';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
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

    this.view.setLogoutIconVisible(rootStore.select(rootSelector.selectLoggedIn));
  }

  private bindViewHandlers(): void {
    this.view.bindLogoutHandler(this.handleLogout);
  }

  private handleLogout = (): void => {
    this.authService.logout();

    Router.instance.navigate(ROUTE_PATH.MAIN);
  };
}
