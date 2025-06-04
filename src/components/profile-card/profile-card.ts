import { div, h3, img } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';

import { BaseComponent } from '../base-component/base-component';
import styles from './profile-card.module.css';

export interface ProfileCardProperties {
  fullname: string;
  image: string;
}

export class ProfileCard extends BaseComponent implements Component {
  private readonly properties: ProfileCardProperties;

  public constructor(properties: ProfileCardProperties) {
    super({ className: styles.card, tagName: 'div' });

    this.properties = properties;

    this.createHTML();
  }

  public createHTML(): void {
    const fullnameElement = h3({ className: styles.fullname }, this.properties.fullname);

    const imageElement = img({
      alt: this.properties.fullname,
      className: styles.image,
      src: this.properties.image,
    });

    const contentElement = div({ className: styles.content }, fullnameElement);

    this.append(imageElement, contentElement);
  }
}
