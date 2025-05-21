import { BUTTON_TEXT } from '~/shared/constants/constants';
import { PASSWORD_PROPS } from '~/shared/constants/input-properties';
import { form } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';
import type { InputBase } from '../common/input/input-base';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputPassword } from '../common/input/input-password/input-password';
import styles from './password-change-form.module.css';

export class PasswordChangeForm extends BaseComponent implements Component {
  private readonly cancelButton = new Button({
    onClick: (): void => {
      console.warn('cancel');
    },
    textContent: BUTTON_TEXT.CANCEL,
    type: 'button',
  });

  private readonly formElement = form({ className: styles.form });

  private inputComponents: InputBase[] = [];

  private readonly inputNewPassword = new InputPassword(PASSWORD_PROPS);

  private readonly inputOldPassword = new InputPassword(PASSWORD_PROPS);

  private readonly submitButton = new Button({
    textContent: BUTTON_TEXT.SAVE,
    type: 'submit',
  });

  public constructor() {
    super({ tagName: 'div' });

    this.storeInputs();
    this.setStyles();
    this.createHTML();
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    this.submitButton[formValid ? 'enable' : 'disable']();
  }

  public createHTML(): void {
    this.formElement.append(
      this.inputNewPassword.element,
      this.inputOldPassword.element,
      this.cancelButton.element,
      this.submitButton.element,
    );
    this.append(this.formElement);
  }

  private addInputComponent(input: InputBase): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }

  private setStyles(): void {
    this.inputNewPassword.addClassNames(styles.formItem);
    this.inputOldPassword.addClassNames(styles.formItem);
    this.cancelButton.addClassNames(styles.formItem);
    this.submitButton.addClassNames(styles.formItem);
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputNewPassword);
    this.addInputComponent(this.inputOldPassword);
  }
}
