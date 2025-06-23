import type { AppChangePasswordPayload } from '~/api/services/customer/types';

import { BUTTON_TEXT } from '~/shared/constants/constants';
import { NEW_PASSWORD_PROPS, OLD_PASSWORD_PROPS } from '~/shared/constants/input-properties';
import { form } from '~/shared/create-element/tags';

import type { Component } from '../../../components/base-component/types';
import type { InputBase } from '../../../components/common/input/input-base';

import { BaseComponent } from '../../../components/base-component/base-component';
import { Button } from '../../../components/common/button/button';
import { ErrorMessage } from '../../../components/common/error-message/error-message';
import { InputPassword } from '../../../components/common/input/input-password/input-password';
import styles from './user-password-change.module.css';

export class UserPasswordChangeView extends BaseComponent implements Component {
  private readonly cancelButton = new Button({
    onClick: (): void => {
      this.resetChanges();
    },
    textContent: BUTTON_TEXT.CANCEL,
    type: 'button',
  });

  private readonly errorMessageComponent = new ErrorMessage();

  private readonly formElement = form({ className: styles.form });

  private readonly inputComponents: InputBase[] = [];

  private readonly inputNewPassword = new InputPassword(NEW_PASSWORD_PROPS);

  private readonly inputOldPassword = new InputPassword(OLD_PASSWORD_PROPS);

  private readonly submitButton = new Button({
    textContent: BUTTON_TEXT.SAVE,
    type: 'submit',
  });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.storeInputs();
    this.setStyles();
    this.createHTML();
  }

  public bindPasswordChangeHandler(
    handler: (payload: AppChangePasswordPayload) => Promise<void>,
  ): void {
    this.formElement.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        handler(this.getPayload());

        this.submitButton.disable();
      },
      { signal: this.abortController.signal },
    );
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    this.submitButton[formValid ? 'enable' : 'disable']();
  }

  public createHTML(): void {
    this.resetChanges();

    this.formElement.append(
      this.inputOldPassword.element,
      this.inputNewPassword.element,
      this.cancelButton.element,
      this.submitButton.element,
    );

    this.submitButton.disable();
    this.cancelButton.disable();

    this.hideError();

    this.append(this.errorMessageComponent, this.formElement);
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

  public resetChanges(): void {
    this.submitButton.disable();
    this.cancelButton.disable();
    this.hideError();

    for (const input of this.inputComponents) {
      input.reset();
    }
  }

  public showError(errorMessage: string): void {
    this.errorMessageComponent.show(errorMessage);
  }

  private addInputComponent(input: InputBase): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();

      if (this.cancelButton.element.disabled) {
        this.cancelButton.enable();
      }
    });

    input.addListener('focus', () => {
      this.hideError();
    });
  }

  private getPayload(): AppChangePasswordPayload {
    return {
      currentPassword: this.inputOldPassword.value.trim(),
      newPassword: this.inputNewPassword.value.trim(),
    };
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
