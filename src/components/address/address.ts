import type { AppChangeAddressPayload, AppCustomerAddress } from '~/api/services/customer/types';
import type { AddressCallbacks } from '~/feature/user-profile/user-addresses/types';

import { BUTTON_TEXT } from '~/shared/constants/constants';
import { COUNTRY_CODES, COUNTRY_NAMES } from '~/shared/constants/country-codes';
import {
  CITY_PROPS,
  COUNTRY_LIST_ID,
  DEFAULT_BILLING_CHECKBOX_PROPS,
  DEFAULT_SHIPPING_CHECKBOX_PROPS,
  STREET_PROPS,
  UNIVERSAL_COUNTRY_PROPS,
  UNIVERSAL_POSTAL_CODE_PROPS,
} from '~/shared/constants/input-properties';
import { datalist, div, form, option, span } from '~/shared/create-element/tags';
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

  private readonly callbacks: AddressCallbacks;

  private readonly cancelButton = new Button({
    onClick: (): void => {
      this.resetView();
    },
    textContent: BUTTON_TEXT.CANCEL,
    type: 'button',
  });

  private readonly countryName;

  private readonly deleteButton = new Button({
    onClick: (): void => {
      this.callbacks.onAddressDeletion(this.address.addressId);
    },
    textContent: BUTTON_TEXT.DELETE,
    type: 'button',
  });

  private readonly formElement = form({ className: styles.form });

  private readonly inputCity = new InputText(CITY_PROPS);

  private inputComponents: InputBase[] = [];

  private readonly inputCountry = new InputText(UNIVERSAL_COUNTRY_PROPS);

  private readonly inputDefaultBilling = new InputCheckbox(DEFAULT_BILLING_CHECKBOX_PROPS);

  private readonly inputDefaultShipping = new InputCheckbox(DEFAULT_SHIPPING_CHECKBOX_PROPS);

  private readonly inputPostcode = new InputText(UNIVERSAL_POSTAL_CODE_PROPS);

  private readonly inputStreet = new InputText(STREET_PROPS);

  private readonly submitButton = new Button({ textContent: BUTTON_TEXT.SAVE, type: 'submit' });

  public constructor(address: AppCustomerAddress, callbacks: AddressCallbacks) {
    super({ tagName: 'div' });

    this.address = address;
    this.callbacks = callbacks;

    this.countryName = this.getCountryByCode();
    this.storeInputs();
    this.setStyles();
    this.setupInputsState();
    this.setupListeners();
    this.createHTML();
    this.addSubmitHandler();
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

  private addSubmitHandler(): void {
    this.formElement.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();

        this.callbacks.onAddressChange(this.getPayload());
      },
      { signal: this.abortController.signal },
    );
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
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.COUNTRY),
        span(null, this.countryName),
      ),
      div(
        { className: styles.detailsItem },
        span({ className: styles.fieldName }, FIELD_NAME.POSTCODE),
        span(null, this.address.postalCode),
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
      this.inputDefaultShipping.element,
      this.inputDefaultBilling.element,
      this.createMoveCheckbox(),
      editButton.element,
      this.deleteButton.element,
    );

    this.replaceChildren(addressBlock);
  }

  private createDataList(): HTMLDataListElement {
    const datalistElement = datalist({ id: COUNTRY_LIST_ID.UNIVERSAL });

    for (const item of COUNTRY_NAMES) {
      const optionElement = option({ value: item });
      datalistElement.append(optionElement);
    }

    return datalistElement;
  }

  private createFormView(): void {
    this.inputCountry.setValue(this.countryName);
    this.inputCity.setValue(this.address.city);
    this.inputStreet.setValue(this.address.streetName);
    this.inputPostcode.setValue(this.address.postalCode);

    this.submitButton.disable();

    this.formElement.append(
      this.inputCountry.element,
      this.inputPostcode.element,
      this.inputCity.element,
      this.inputStreet.element,

      this.cancelButton.element,
      this.submitButton.element,
      this.createDataList(),
    );

    this.replaceChildren(this.formElement);
  }

  private createMoveCheckbox(): HTMLElement {
    const inputMove = new InputCheckbox({
      label: this.address.billing ? 'Use for shipping' : 'Use for billing',
    });

    inputMove.setChecked(
      this.address.billing && this.address.inShipping
        ? true
        : this.address.shipping && this.address.inBilling
          ? true
          : false,
    );

    inputMove.addListener('change', () => {
      this.callbacks.onAddressTransition(this.address, inputMove.checked);
    });

    return inputMove.element;
  }

  private getCountryByCode(): string {
    return (
      Object.entries(COUNTRY_CODES).find(([, value]) => value === this.address.country)?.[0] ?? ''
    );
  }

  private getPayload(): AppChangeAddressPayload {
    return {
      address: {
        city: this.inputCity.value.trim(),
        country: COUNTRY_CODES[this.inputCountry.value] ?? '',

        postalCode: this.inputPostcode.value.trim(),
        streetName: this.inputStreet.value.trim(),
      },
      addressId: this.address.addressId,
    };
  }

  private setStyles(): void {
    this.inputCountry.addClassNames(styles.formItem);
    this.inputCity.addClassNames(styles.formItem);
    this.inputStreet.addClassNames(styles.formItem);
    this.inputPostcode.addClassNames(styles.formItem);
    this.cancelButton.addClassNames(styles.formItem);
    this.submitButton.addClassNames(styles.formItem);

    this.deleteButton.addClassNames(styles.detailsItem);
    this.inputDefaultBilling.addClassNames(styles.detailsItem, styles.checkbox);
    this.inputDefaultShipping.addClassNames(styles.detailsItem, styles.checkbox);
  }

  private setupInputsState(): void {
    this.inputDefaultShipping.setChecked(this.address.defaultShipping);
    this.inputDefaultBilling.setChecked(this.address.defaultBilling);

    this.inputPostcode.addValidator(validatePostalCode(() => this.inputCountry.value));
  }

  private setupListeners(): void {
    this.inputCountry.addListener('change', () => {
      if (this.inputPostcode.value) {
        this.inputPostcode.validate();
      }
    });

    this.inputDefaultBilling.addListener('change', () => {
      this.callbacks.onBillingDefaultToggle(
        this.address.addressId,
        this.inputDefaultBilling.checked,
      );
    });

    this.inputDefaultShipping.addListener('change', () => {
      this.callbacks.onShippingDefaultToggle(
        this.address.addressId,
        this.inputDefaultShipping.checked,
      );
    });
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputCountry);
    this.addInputComponent(this.inputPostcode);
    this.addInputComponent(this.inputCity);
    this.addInputComponent(this.inputStreet);
  }
}
