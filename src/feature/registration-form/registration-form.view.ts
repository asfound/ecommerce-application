import type { SignupPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { div, form, h1 } from '~/shared/create-element/tags';

import styles from './registration-form.module.css';

export class RegistrationFormView extends BaseComponent implements Component {
  private readonly formElement = form({});

  private readonly submitButton = new Button({
    textContent: 'Register',
    type: 'submit',
  });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.createHTML();
  }

  public bindSubmitHandler(handler: (payload: SignupPayload) => void): void {
    this.formElement.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        console.warn(handler);
      },
      { signal: this.abortController.signal },
    );
  }

  public createHTML(): void {
    const formHeader = div(
      { className: styles.formHeader },
      h1({ className: styles.formTitle }, 'Register'),
      div({ className: styles.formSubtitle }, 'Please fill in the fields below:'),
    );

    this.formElement.append(formHeader, this.submitButton.element);

    this.append(this.formElement);
  }
}
