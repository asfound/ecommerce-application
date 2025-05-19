import { BaseComponent } from '~/components/base-component/base-component';

import styles from './loader.module.css';

export interface LoaderProperties {
  size: 'medium' | 'small';
}

export class Loader extends BaseComponent {
  public constructor(properties: LoaderProperties) {
    super({ className: [styles.loader, styles[properties.size]], tagName: 'div' });
  }

  public hide(): void {
    this.addClassNames(styles.hidden);
  }

  public show(): void {
    this.removeClassNames(styles.hidden);
  }
}
