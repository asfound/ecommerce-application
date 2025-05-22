import type { AppCustomer, PersonalDataPayload } from '~/api/services/customer/types';

import { BUTTON_TEXT } from '~/shared/constants/constants';
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
import { FIELD_NAME } from './constants';
import styles from './user-details.module.css';

export class UserDetailsView extends BaseComponent implements Component {
  private readonly cancelButton = new Button({
    onClick: (): void => {
      this.resetView();
    },
    textContent: BUTTON_TEXT.CANCEL,
    type: 'button',
  });

  private readonly formElement = form({ className: styles.form });

  private readonly inputBirthDate = new InputDate(DATE_OF_BIRTH_PROPS);

  private readonly inputComponents: InputBase[] = [];

  private readonly inputEmail = new InputText(EMAIL_PROPS);

  private readonly inputFirstName = new InputText(FIRST_NAME_PROPS);

  private readonly inputLastName = new InputText(LAST_NAME_PROPS);

  private readonly submitButton = new Button({
    textContent: BUTTON_TEXT.SAVE,
    type: 'submit',
  });

  private userInformation: AppCustomer | null = null;

  public constructor() {
    super({ tagName: 'div' });

    this.storeInputs();
    this.setStyles();
  }

  public bindDataUpdateHandler(handler: (payload: PersonalDataPayload) => Promise<void>): void {
    this.formElement.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        handler(this.getPayload());
      },
      { signal: this.abortController.signal },
    );
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    this.submitButton[formValid ? 'enable' : 'disable']();
  }

  public createHTML(userInformation: AppCustomer): void {
    this.userInformation = userInformation;
    this.createBaseView();
  }

  public resetInputs(): void {
    for (const input of this.inputComponents) {
      input.reset();
    }
  }

  public resetView(): void {
    this.resetInputs();
    this.createBaseView();
  }

  private addInputComponent(input: InputBase): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }

  private createBaseView(): void {
    const editButton = new Button({
      onClick: (): void => {
        this.createFormView();
      },
      textContent: BUTTON_TEXT.EDIT,
      type: 'button',
    });

    editButton.addClassNames(styles.detailsItem);

    const detailsBlock = div(
      { className: styles.details },
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.FIRST_NAME),
        span({ className: styles.userInfo }, this.userInformation?.firstName),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.LAST_NAME),
        span({ className: styles.userInfo }, this.userInformation?.lastName),
      ),

      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.BIRTHDAY),
        span({ className: styles.userInfo }, this.userInformation?.dateOfBirth),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.EMAIL),
        span({ className: styles.userInfo }, this.userInformation?.email),
      ),
      editButton.element,
    );

    this.replaceChildren(detailsBlock);
  }

  private createFormView(): void {
    this.inputFirstName.setValue(this.userInformation?.firstName ?? '');
    this.inputLastName.setValue(this.userInformation?.lastName ?? '');
    this.inputBirthDate.setValue(this.userInformation?.dateOfBirth ?? '');
    this.inputEmail.setValue(this.userInformation?.email ?? '');
    this.submitButton.disable();

    this.formElement.append(
      this.inputFirstName.element,
      this.inputLastName.element,
      this.inputBirthDate.element,
      this.inputEmail.element,
      this.cancelButton.element,
      this.submitButton.element,
    );

    this.replaceChildren(this.formElement);
  }

  private getPayload(): PersonalDataPayload {
    const sourceCustomer = {
      dateOfBirth: this.userInformation?.dateOfBirth ?? '',
      email: this.userInformation?.email ?? '',
      firstName: this.userInformation?.firstName ?? '',
      lastName: this.userInformation?.lastName ?? '',
      version: this.userInformation?.version ?? 0,
    };

    const editedCustomer = {
      dateOfBirth: this.inputBirthDate.value.trim(),
      email: this.inputEmail.value.trim(),
      firstName: this.inputFirstName.value.trim(),
      lastName: this.inputLastName.value.trim(),
      version: this.userInformation?.version ?? 0,
    };

    return { editedCustomer, sourceCustomer };
  }

  private setStyles(): void {
    this.inputFirstName.addClassNames(styles.formItem);
    this.inputLastName.addClassNames(styles.formItem);
    this.inputBirthDate.addClassNames(styles.formItem);
    this.inputEmail.addClassNames(styles.formItem);
    this.submitButton.addClassNames(styles.formItem);
    this.cancelButton.addClassNames(styles.formItem);
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputFirstName);
    this.addInputComponent(this.inputLastName);
    this.addInputComponent(this.inputBirthDate);
    this.addInputComponent(this.inputEmail);
  }
}
