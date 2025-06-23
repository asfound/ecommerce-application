import { APP_ERROR_MESSAGE } from '~/app/constants';
import gifHUH from '~/assets/img/huh-cat.gif';
import { h1, img } from '~/shared/create-element/tags';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import styles from './fallback-ui.module.css';

export class FallbackUI extends BaseComponent {
  public constructor() {
    super({ className: styles.fallback, tagName: 'div' });

    this.append(
      h1(null, APP_ERROR_MESSAGE.FAILED_TO_INITIALIZE),
      img({ className: styles.gif, src: gifHUH }),
      new Button({
        className: styles.button,
        onClick: (): void => {
          globalThis.location.reload();
        },
        textContent: 'Reload page',
        type: 'button',
      }),
    );
  }
}
