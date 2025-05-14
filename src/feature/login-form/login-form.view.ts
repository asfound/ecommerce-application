import type { LoginPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';

import { ROUTE_PATH } from '~/app/router/route-path';
import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { ErrorMessage } from '~/components/common/error-message/error-message';
import { Input } from '~/components/common/input/input';
import { FormHeader } from '~/components/form-header/form-header';
import { EMAIL_PROPS, PASSWORD_PROPS } from '~/shared/constants/input-properties';
import { a, div, form } from '~/shared/create-element/tags';

import { LOGIN_FORM_TEXT } from './constants';
import styles from './login-form.module.css';

export class LoginFormView extends BaseComponent implements Component {
  private readonly buttonSubmit = new Button({
    textContent: LOGIN_FORM_TEXT.LOG_IN,
    type: 'submit',
  });

  private readonly errorMessageComponent = new ErrorMessage();

  private readonly formElement = form({ className: styles.form });

  private readonly inputComponents: Input[] = [];

  private readonly inputEmail = new Input(EMAIL_PROPS);

  private readonly inputPassword = new Input(PASSWORD_PROPS);

  private readonly registrationLinkElement = a(
    { href: ROUTE_PATH.REGISTRATION },
    LOGIN_FORM_TEXT.CREATE_ACCOUNT,
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
    const formHeader = new FormHeader({
      subtitle: LOGIN_FORM_TEXT.SUBTITLE,
      title: LOGIN_FORM_TEXT.TITLE,
    });

    const registrationLinkContainer = div(
      { className: styles.linkContainer },
      LOGIN_FORM_TEXT.NEW_TO_HUH_COFFEE,
      this.registrationLinkElement,
    );

    this.buttonSubmit.disable();

    this.addInput(this.inputEmail);
    this.addInput(this.inputPassword);

    this.formElement.append(
      formHeader.element,
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
