import type { LoginPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { ErrorMessage } from '~/components/common/error-message/error-message';
import { Input } from '~/components/common/input/input';
import { EMAIL_PROPS, PASSWORD_PROPS } from '~/shared/constants/input-properties';
import { a, div, form, h2 } from '~/shared/create-element/tags';

import styles from './login-form.module.css';

export class LoginFormView extends BaseComponent implements Component {
  private readonly buttonSubmit = new Button({
    textContent: 'Log in',
    type: 'submit',
  });

  private readonly errorMessageComponent = new ErrorMessage();

  private readonly formElement = form({ className: styles.form });

  private readonly inputComponents: Input[] = [];

  private readonly inputEmail = new Input(EMAIL_PROPS);

  private readonly inputPassword = new Input(PASSWORD_PROPS);

  private readonly registrationLinkElement = a(
    { href: ROUTE_PATH.REGISTRATION },
    'Create an account',
  );

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.createHTML();
  }

  public bindRegistrationLinkHandler(handler: () => void): void {
    this.registrationLinkElement.addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        handler();
      },
      { signal: this.abortController.signal },
    );
  }

  public bindSubmitHandler(handler: (payload: LoginPayload) => void): void {
    this.formElement.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        handler({
          email: this.inputEmail.value.trim(),
          password: this.inputPassword.value.trim(),
        });
      },
      { signal: this.abortController.signal },
    );
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    if (formValid) {
      this.buttonSubmit.enable();
    } else {
      this.buttonSubmit.disable();
    }
  }

  public createHTML(): void {
    const formHeader = div(
      { className: styles.formHeader },
      h2({ className: styles.formTitle }, 'Log In'),
      div({ className: styles.formSubtitle }, 'Please enter your e-mail and password:'),
    );

    const registrationLinkContainer = div(
      { className: styles.registrationLinkContainer },
      'New to HUH Coffee?',
      this.registrationLinkElement,
    );

    this.buttonSubmit.disable();

    this.addInput(this.inputEmail);
    this.addInput(this.inputPassword);

    this.formElement.append(
      formHeader,
      this.errorMessageComponent.element,
      this.inputEmail.element,
      this.inputPassword.element,
      this.buttonSubmit.element,
      registrationLinkContainer,
    );

    this.append(this.formElement);
  }

  public override destroy(): void {
    for (const input of this.inputComponents) {
      input.destroy();
    }

    this.inputComponents.length = 0;

    super.destroy();
  }

  public hideError(): void {
    this.errorMessageComponent.hide();
  }

  public showError(errorMessage: string): void {
    this.errorMessageComponent.show(errorMessage);
  }

  private addInput(input: Input): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }
}
