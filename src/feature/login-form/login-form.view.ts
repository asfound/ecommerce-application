import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { INPUT_TYPE, REQUIRED_PASSWORD_LENGTH } from '~/shared/constants/constants';
import { div, form, h2 } from '~/shared/create-element/tags';
import {
  validateEmailFormat,
  validateHasDigit,
  validateHasLowercase,
  validateHasUppercase,
  validateMinLength,
  validateNoSpaces,
  validateOnlyEnglishLetters,
  validateRequired,
} from '~/shared/form-validators/form-validators';

import { Input } from './input';
import styles from './login-form.module.css';

export class LoginFormView extends BaseComponent implements Component {
  private readonly buttonSubmit = new Button({
    textContent: 'Log in',
    type: 'submit',
  });

  private readonly formElement = form({ className: styles.form });

  private readonly inputComponents: Input[] = [];

  private readonly inputEmail = new Input({
    name: 'email',
    placeholder: 'Email',
    type: INPUT_TYPE.TEXT,
    validators: [validateRequired, validateNoSpaces, validateEmailFormat],
  });

  private readonly inputPassword = new Input({
    enablePasswordToggle: true,
    name: 'password',
    placeholder: 'Password',
    type: INPUT_TYPE.PASSWORD,
    validators: [
      validateRequired,
      validateNoSpaces,
      validateOnlyEnglishLetters,
      validateMinLength(REQUIRED_PASSWORD_LENGTH),
      validateHasUppercase,
      validateHasLowercase,
      validateHasDigit,
    ],
  });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.createHTML();
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
      div(null, 'Please enter your e-mail and password:'),
    );

    this.buttonSubmit.disable();

    this.addInput(this.inputEmail);
    this.addInput(this.inputPassword);

    this.formElement.append(
      formHeader,
      this.inputEmail.element,
      this.inputPassword.element,
      this.buttonSubmit.element,
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

  private addInput(input: Input): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }
}
