import type { AppCustomer } from '~/api/services/customer/types';

import {
  DATE_OF_BIRTH_PROPS,
  EMAIL_PROPS,
  FIRST_NAME_PROPS,
  LAST_NAME_PROPS,
} from '~/shared/constants/input-properties';
import { div, form, span } from '~/shared/create-element/tags';

import type { Component } from '../base-component/types';
import type { InputBase } from '../common/input/input-base';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputDate } from '../common/input/input-date/input-date';
import { InputText } from '../common/input/input-text/input-text';
import styles from './user-details.module.css';

export const FIELD_NAME = {
  BIRTHDAY: 'Birthday:',
  EMAIL: 'Email:',
  FIRST_NAME: 'First name:',
  LAST_NAME: 'Last name:',
};

export const BUTTON_TEXT = {
  CANCEL: 'Cancel',
  EDIT: 'Edit',
  SAVE: 'Save changes',
};

export class UserDetails extends BaseComponent implements Component {
  private readonly formElement = form({ className: styles.form });

  private readonly inputBirthDate = new InputDate(DATE_OF_BIRTH_PROPS);

  private inputComponents: InputBase[] = [];

  private readonly inputEmail = new InputText(EMAIL_PROPS);

  private readonly inputFirstName = new InputText(FIRST_NAME_PROPS);

  private readonly inputLastName = new InputText(LAST_NAME_PROPS);

  private isEditing = false;

  private readonly submitButton = new Button({
    textContent: BUTTON_TEXT.SAVE,
    type: 'submit',
  });

  public constructor() {
    super({ tagName: 'div' });

    this.storeInputs();

    this.setStyles();
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    this.submitButton[formValid ? 'enable' : 'disable']();
  }

  public createHTML(userInformation: AppCustomer): void {
    this.replaceChildren();

    if (this.isEditing) {
      this.createFormView(userInformation);
    } else {
      this.createBaseView(userInformation);
    }
  }

  private addInputComponent(input: InputBase): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }

  private createBaseView(userInformation: AppCustomer): void {
    const detailsBlock = div(
      { className: styles.details },

      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.FIRST_NAME),
        span({ className: styles.userInfo }, userInformation.firstName),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.LAST_NAME),
        span({ className: styles.userInfo }, userInformation.lastName),
      ),

      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.BIRTHDAY),
        span({ className: styles.userInfo }, userInformation.dateOfBirth),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.EMAIL),
        span({ className: styles.userInfo }, userInformation.email),
      ),
    );

    const editButton = new Button({ textContent: BUTTON_TEXT.EDIT, type: 'submit' });

    editButton.addListener('click', () => {
      this.isEditing = true;
      this.createHTML(userInformation);
    });

    this.append(detailsBlock, editButton);
  }

  private createFormView(userInformation: AppCustomer): void {
    this.inputFirstName.setValue(userInformation.firstName);
    this.inputLastName.setValue(userInformation.lastName);
    this.inputBirthDate.setValue(userInformation.dateOfBirth);
    this.inputEmail.setValue(userInformation.email);
    this.submitButton.disable();

    const cancelButton = new Button({ textContent: BUTTON_TEXT.CANCEL, type: 'button' });
    cancelButton.addClassNames(styles.formItem);

    cancelButton.addListener('click', () => {
      this.isEditing = false;
      this.createHTML(userInformation);
    });

    this.formElement.append(
      this.inputFirstName.element,
      this.inputLastName.element,
      this.inputBirthDate.element,
      this.inputEmail.element,
      cancelButton.element,
      this.submitButton.element,
    );

    this.append(this.formElement);
  }

  private setStyles(): void {
    this.inputFirstName.addClassNames(styles.formItem);
    this.inputLastName.addClassNames(styles.formItem);
    this.inputBirthDate.addClassNames(styles.formItem);
    this.inputEmail.addClassNames(styles.formItem);
    this.submitButton.addClassNames(styles.formItem);
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputFirstName);
    this.addInputComponent(this.inputLastName);
    this.addInputComponent(this.inputBirthDate);
    this.addInputComponent(this.inputEmail);
  }
}
