import type { SignupPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';
import type { InputProperties } from '~/components/common/input/input';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { Input } from '~/components/common/input/input';
import {
  INPUT_TYPE,
  REQUIRED_MIN_AGE,
  REQUIRED_NAME_LENGTH,
  REQUIRED_PASSWORD_LENGTH,
} from '~/shared/constants/constants';
import { div, form, h1 } from '~/shared/create-element/tags';
import {
  validateEmailFormat,
  validateHasDigit,
  validateHasLowercase,
  validateHasUppercase,
  validateMinAge,
  validateMinLength,
  validateNoSpaces,
  validateOnlyEnglishLetters,
  validateRequired,
} from '~/shared/form-validators/form-validators';

import styles from './registration-form.module.css';

// input consts, reuse in login
export const EMAIL_PROPS: InputProperties = {
  name: 'email',
  placeholder: 'Email',
  type: INPUT_TYPE.TEXT,
  validators: [validateRequired, validateNoSpaces, validateEmailFormat],
};

export const PASSWORD_PROPS: InputProperties = {
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
};

export const FIRST_NAME_PROPS: InputProperties = {
  name: 'first name',
  placeholder: 'First Name',
  type: INPUT_TYPE.TEXT,
  validators: [
    validateRequired,
    validateOnlyEnglishLetters,
    validateMinLength(REQUIRED_NAME_LENGTH),
  ],
};

export const LAST_NAME_PROPS: InputProperties = {
  name: 'last name',
  placeholder: 'Last Name',
  type: INPUT_TYPE.TEXT,
  validators: [
    validateRequired,
    validateOnlyEnglishLetters,
    validateMinLength(REQUIRED_NAME_LENGTH),
  ],
};

export const DATE_OF_BIRTH_PROPS: InputProperties = {
  name: 'date of birth',
  placeholder: 'dd.mm.yy',
  type: INPUT_TYPE.DATE,
  validators: [validateRequired, validateMinAge(REQUIRED_MIN_AGE)],
};

export class RegistrationFormView extends BaseComponent implements Component {
  private readonly formElement = form({});

  private readonly inputComponents: Input[] = [];

  private readonly inputDate = new Input(DATE_OF_BIRTH_PROPS);

  private readonly inputEmail = new Input(EMAIL_PROPS);

  private readonly inputFirstName = new Input(FIRST_NAME_PROPS);

  private readonly inputLastName = new Input(LAST_NAME_PROPS);

  private readonly inputPassword = new Input(PASSWORD_PROPS);

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

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    if (formValid) {
      this.submitButton.enable();
    } else {
      this.submitButton.disable();
    }
  }

  public createHTML(): void {
    const formHeader = div(
      { className: styles.formHeader },
      h1({ className: styles.formTitle }, 'Register'),
      div({ className: styles.formSubtitle }, 'Please fill in the fields below:'),
    );

    this.submitButton.disable();

    this.addInput(this.inputEmail);
    this.addInput(this.inputPassword);
    this.addInput(this.inputFirstName);
    this.addInput(this.inputLastName);
    this.addInput(this.inputDate);

    this.formElement.append(
      formHeader,
      this.inputEmail.element,
      this.inputPassword.element,
      this.inputFirstName.element,
      this.inputLastName.element,
      this.inputDate.element,
      this.submitButton.element,
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
