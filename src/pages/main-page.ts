import { ROUTE_PATH } from '~/app/router/route-path';
import { Router } from '~/app/router/router';
import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { HeroBanner } from '~/feature/hero-banner/hero-banner';
import { div } from '~/shared/create-element/tags';

import styles from './main-page.module.css';

export class MainPage extends BaseComponent {
  public constructor() {
    super({ tagName: 'main' });

    const heroBanner = new HeroBanner();

    // TODO: remove after sprint-2
    const buttonLogin = new Button({
      onClick(): void {
        Router.instance.navigate(ROUTE_PATH.LOGIN);
      },
      textContent: 'Login',
      type: 'button',
    });
    const buttonRegistration = new Button({
      onClick(): void {
        Router.instance.navigate(ROUTE_PATH.REGISTRATION);
      },
      textContent: 'Registration',
      type: 'button',
    });
    const buttonsContainer = div(
      { className: styles.buttonsContainer },
      buttonLogin.element,
      buttonRegistration.element,
    );
    // ================================

    this.append(heroBanner, buttonsContainer);
  }
}
