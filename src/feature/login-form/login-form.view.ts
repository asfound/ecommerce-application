import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { button, div, h2 } from '~/shared/create-element/tags';

import { Input } from './input';
import styles from './login-form.module.css';
import {
  PASSWORD_LENGTH,
  validateEmailFormat,
  validateHasDigit,
  validateHasLowercase,
  validateHasUppercase,
  validateMinLength,
  validateNoSpaces,
  validateOnlyEnglishLetters,
  validateRequired,
} from './validators';

export class LoginFormView extends BaseComponent<HTMLFormElement> implements Component {
  public constructor() {
    super({ className: styles.form, tagName: 'form' });

    this.createHTML();
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
      type: 'text',
      validators: [validateRequired, validateNoSpaces, validateEmailFormat],
    });

    const inputPassword = new Input({
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      validators: [
        validateRequired,
        validateNoSpaces,
        validateMinLength(PASSWORD_LENGTH),
        validateHasUppercase,
        validateHasLowercase,
        validateHasDigit,
        validateOnlyEnglishLetters,
      ],
    });

    const buttonSubmit = button({ className: styles.button, type: 'submit' }, 'Log in');

    this.append(formHeader, inputEmail, inputPassword, buttonSubmit);
  }
}
