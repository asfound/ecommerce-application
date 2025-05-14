import { div, h1 } from '~/shared/create-element/tags';

import { BaseComponent } from '../base-component/base-component';
import styles from './form-header.module.css';

export interface FormHeaderProperties {
  subtitle: string;
  title: string;
}

export class FormHeader extends BaseComponent {
  public constructor(properties: FormHeaderProperties) {
    super({ className: styles.formHeader, tagName: 'div' });

    const titleElement = h1({ className: styles.formTitle }, properties.title);
    const subtitleElement = div({ className: styles.formSubtitle }, properties.subtitle);

    this.append(titleElement, subtitleElement);
  }
}
