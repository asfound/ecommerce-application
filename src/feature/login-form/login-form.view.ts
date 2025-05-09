import { BaseComponent } from '~/components/base-component/base-component';

import styles from './login-form.module.css';

export class LoginFormView extends BaseComponent<HTMLFormElement> {
  public constructor() {
    super({ className: styles.form, tagName: 'form' });
  }
}
