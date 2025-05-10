import { BaseComponent } from '~/components/base-component/base-component';

import styles from './error-message.module.css';

export class ErrorMessage extends BaseComponent {
  public constructor() {
    super({ className: styles.container, tagName: 'div' });
  }

  public hide(): void {
    this.setTextContent('');
    this.removeClassNames(styles.visible);
  }

  public show(message: string): void {
    this.setTextContent(message);
    this.addClassNames(styles.visible);
  }
}
