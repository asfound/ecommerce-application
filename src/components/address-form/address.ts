import type { AppCustomerAddress } from '~/api/services/customer/types';

import { BUTTON_TEXT } from '~/shared/constants/constants';
import { COUNTRY_CODES } from '~/shared/constants/country-codes';
import {
  CITY_PROPS,
  DEFAULT_BILLING_CHECKBOX_PROPS,
  DEFAULT_SHIPPING_CHECKBOX_PROPS,
  STREET_PROPS,
  UNIVERSAL_COUNTRY_PROPS,
  UNIVERSAL_POSTAL_CODE_PROPS,
} from '~/shared/constants/input-properties';
import { div, form, span } from '~/shared/create-element/tags';
import { validatePostalCode } from '~/shared/form-validators/form-validators';

import type { Component } from '../base-component/types';
import type { InputBase } from '../common/input/input-base';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputCheckbox } from '../common/input/input-checkbox/input-checkbox';
import { InputText } from '../common/input/input-text/input-text';
import styles from './address.module.css';
import { FIELD_NAME } from './constants';

export class UserAddress extends BaseComponent implements Component {
  private readonly address: AppCustomerAddress;

  private readonly cancelButton = new Button({ textContent: BUTTON_TEXT.CANCEL, type: 'button' });

  private readonly countryName;

  private readonly deleteButton = new Button({ textContent: BUTTON_TEXT.DELETE, type: 'button' });

  private readonly formElement = form({ className: styles.form });

  private readonly inputCity = new InputText(CITY_PROPS);

  private inputComponents: InputBase[] = [];

  private readonly inputCountry = new InputText(UNIVERSAL_COUNTRY_PROPS);

  private readonly inputDefaultBilling = new InputCheckbox(DEFAULT_BILLING_CHECKBOX_PROPS);

  private readonly inputDefaultShipping = new InputCheckbox(DEFAULT_SHIPPING_CHECKBOX_PROPS);

  private readonly inputPostcode = new InputText(UNIVERSAL_POSTAL_CODE_PROPS);

  private readonly inputStreet = new InputText(STREET_PROPS);

  private readonly submitButton = new Button({ textContent: BUTTON_TEXT.SAVE, type: 'button' });

  public constructor(address: AppCustomerAddress) {
    super({ tagName: 'div' });

    this.address = address;
    this.countryName = this.getCountryByCode();

    this.storeInputs();
    this.setStyles();
    this.setupInputsState();
    this.setupListeners();
    this.createHTML();
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    this.submitButton[formValid ? 'enable' : 'disable']();
  }

  public createHTML(): void {
    this.createBaseView();
  }

  public override destroy(): void {
    for (const input of this.inputComponents) {
      input.destroy();
    }

    this.inputComponents.length = 0;

    super.destroy();
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

    const addressBlock = div(
      { className: styles.details },
      this.inputDefaultShipping.element,
      this.inputDefaultBilling.element,
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.COUNTRY),
        span(null, this.countryName),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.CITY),
        span(null, this.address.city),
      ),

      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.STREET),
        span(null, this.address.streetName),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.POSTCODE),
        span(null, this.address.postalCode),
      ),

      editButton.element,
      this.deleteButton.element,
    );

    this.append(addressBlock);
  }

  private createFormView(): void {
    this.inputCountry.setValue(this.countryName);
    this.inputCity.setValue(this.address.city);
    this.inputStreet.setValue(this.address.streetName);
    this.inputPostcode.setValue(this.address.postalCode);

    this.formElement.append(
      this.inputCountry.element,
      this.inputCity.element,
      this.inputStreet.element,
      this.inputPostcode.element,
      this.cancelButton.element,
      this.submitButton.element,
    );

    this.replaceChildren(this.formElement);
  }

  private getCountryByCode(): string {
    return (
      Object.entries(COUNTRY_CODES).find(([, value]) => value === this.address.country)?.[0] ?? ''
    );
  }

  private setStyles(): void {
    this.inputCountry.addClassNames(styles.formItem);
    this.inputCity.addClassNames(styles.formItem);
    this.inputStreet.addClassNames(styles.formItem);
    this.inputPostcode.addClassNames(styles.formItem);
    this.deleteButton.addClassNames(styles.detailsItem);
    this.inputDefaultBilling.addClassNames(styles.detailsItem);
    this.inputDefaultShipping.addClassNames(styles.detailsItem);
  }

  private setupInputsState(): void {
    if (this.address.defaultShipping) {
      this.inputDefaultShipping.setChecked();
    }

    if (this.address.defaultBilling) {
      this.inputDefaultBilling.setChecked();
    }

    this.inputPostcode.addValidator(validatePostalCode(() => this.inputCountry.value));
  }

  private setupListeners(): void {
    this.inputCountry.addListener('change', () => {
      if (this.inputPostcode.value) {
        this.inputPostcode.validate();
      }
    });
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputCity);
    this.addInputComponent(this.inputCountry);
    this.addInputComponent(this.inputStreet);
    this.addInputComponent(this.inputPostcode);
  }
}
