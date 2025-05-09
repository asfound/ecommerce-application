import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './logo.module.css';

export class Logo extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.logo, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const teamName = new BaseComponent({
      className: styles.team,
      tagName: 'span',
      textContent: 'HUH?',
    });

    const projectTheme = new BaseComponent({ tagName: 'span', textContent: 'Coffee' });

    this.append(teamName, projectTheme);
  }
}
