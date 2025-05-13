import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';

import styles from './footer.module.css';

export class Footer extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.footer, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    console.warn('footer');
  }
}
