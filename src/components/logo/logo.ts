import { PROJECT_NAME } from '~/shared/constants/constants';
import { span } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './logo.module.css';

export class Logo extends BaseComponent implements Component {
  public constructor() {
    super({ className: styles.logo, tagName: 'div' });

    this.createHTML();
  }

  public createHTML(): void {
    const teamName = span({ className: styles.team }, PROJECT_NAME.TEAM);
    const projectTheme = span({}, PROJECT_NAME.PROJECT);

    this.append(teamName, projectTheme);
  }
}
