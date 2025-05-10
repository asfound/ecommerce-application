import type { AuthService } from '~/api/services/auth/auth.service';

import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { Presenter } from '~/shared/presenter/presenter';

import type { HeaderView } from './header.view';

export class HeaderPresenter extends Presenter<HeaderView> {
  private readonly authService: AuthService;

  public constructor(view: HeaderView, authService: AuthService) {
    super(view);

    this.authService = authService;

    this.bindViewHandlers();
  }

  private bindViewHandlers(): void {
    this.view.bindLogoutHandler(this.handleLogout);
  }

  private handleLogout = (): void => {
    this.authService.logout();

    Router.instance.navigate(ROUTE_PATH.MAIN);
  };
}
