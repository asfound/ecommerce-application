import { BaseComponent } from '~/components/base-component/base-component';

import styles from './loader.module.css';

export class Loader extends BaseComponent {
  public constructor() {
    super({ className: styles.loader, tagName: 'div' });
  }

  public hide(): void {
    this.addClassNames(styles.hidden);
  }

  public show(): void {
    this.removeClassNames(styles.hidden);
  }
}
