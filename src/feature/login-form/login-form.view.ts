import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { INPUT_TYPE, REQUIRED_PASSWORD_LENGTH } from '~/shared/constants/constants';
import { div, h2 } from '~/shared/create-element/tags';
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

export class LoginFormView extends BaseComponent<HTMLFormElement> implements Component {
  private readonly buttonSubmit = new Button({
    textContent: 'Log in',
    type: 'submit',
  });

  private readonly inputComponents: Input[] = [];

  public constructor() {
    super({ className: styles.form, tagName: 'form' });

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
      h2(null, 'Log In'),
      div(null, 'Please enter your e-mail and password:'),
    );

    const inputEmail = new Input({
      name: 'email',
      placeholder: 'Email',
      type: INPUT_TYPE.TEXT,
      validators: [validateRequired, validateNoSpaces, validateEmailFormat],
    });

    const inputPassword = new Input({
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

    this.buttonSubmit.disable();

    this.addInput(inputEmail);
    this.addInput(inputPassword);

    this.append(formHeader, inputEmail, inputPassword, this.buttonSubmit);
  }

  private addInput(input: Input): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }
}
