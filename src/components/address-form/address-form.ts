import type { AppCustomerAddress } from '~/api/services/customer/types';

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
import { datalist, form, option } from '~/shared/create-element/tags';
import { validatePostalCode } from '~/shared/form-validators/form-validators';

import type { Component } from '../base-component/types';
import type { InputBase } from '../common/input/input-base';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputCheckbox } from '../common/input/input-checkbox/input-checkbox';
import { InputText } from '../common/input/input-text/input-text';
import styles from './address-form.module.css';

export interface AddressFormData {
  city: string;
  country: string;
  default?: boolean;
  postalCode: string;
  streetName: string;
}

export interface AddressFormProperties {
  address?: AppCustomerAddress;
  onCancel(): void;
  onSubmit(data: AddressFormData): void;
}

export class AddressForm extends BaseComponent implements Component {
  private readonly address: AppCustomerAddress | null = null;

  private readonly cancelButton = new Button({ textContent: BUTTON_TEXT.CANCEL, type: 'button' });

  private readonly countryName;

  private readonly formElement = form({ className: styles.form });

  private readonly inputCity = new InputText(CITY_PROPS);

  private readonly inputComponents: InputBase[] = [];

  private readonly inputCountry = new InputText(UNIVERSAL_COUNTRY_PROPS);

  private readonly inputDefaultBilling = new InputCheckbox(DEFAULT_BILLING_CHECKBOX_PROPS);

  private readonly inputDefaultShipping = new InputCheckbox(DEFAULT_SHIPPING_CHECKBOX_PROPS);

  private readonly inputPostcode = new InputText(UNIVERSAL_POSTAL_CODE_PROPS);

  private readonly inputStreet = new InputText(STREET_PROPS);

  private readonly onCancel: () => void;

  private readonly onSubmit: (data: AddressFormData) => void;

  private readonly submitButton = new Button({ textContent: BUTTON_TEXT.SAVE, type: 'button' });

  public constructor(properties: AddressFormProperties) {
    super({ tagName: 'form' });

    if (properties.address) {
      this.address = properties.address;
      this.countryName = this.getCountryByCode(this.address.country);
    }

    this.onCancel = (): void => {
      properties.onCancel();
    };
    this.onSubmit = (data): void => {
      properties.onSubmit(data);
    };

    this.storeInputs();
    this.setStyles();
    this.setupListeners();
    this.createHTML();
  }

  public checkValidity(): void {
    const formValid = this.inputComponents.every((input) => input.validate());

    this.submitButton[formValid ? 'enable' : 'disable']();
  }

  public createHTML(): void {
    if (this.address && this.countryName) {
      this.inputCountry.setValue(this.countryName);
      this.inputCity.setValue(this.address.city);
      this.inputStreet.setValue(this.address.streetName);
      this.inputPostcode.setValue(this.address.postalCode);
    }

    this.formElement.append(
      this.inputCountry.element,
      this.inputPostcode.element,
      this.inputCity.element,
      this.inputStreet.element,
      this.cancelButton.element,
      this.submitButton.element,
      this.createDataList(),
    );

    this.inputPostcode.addValidator(validatePostalCode(() => this.inputCountry.value));

    this.replaceChildren(this.formElement);
  }

  private addInputComponent(input: InputBase): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }

  private createDataList(): HTMLDataListElement {
    const datalistElement = datalist({ id: COUNTRY_LIST_ID.UNIVERSAL });

    for (const item of COUNTRY_NAMES) {
      const optionElement = option({ value: item });
      datalistElement.append(optionElement);
    }

    return datalistElement;
  }

  private getCountryByCode(countryCode: string): string {
    return Object.entries(COUNTRY_CODES).find(([, value]) => value === countryCode)?.[0] ?? '';
  }

  private getPayload(): AddressFormData {
    return {
      city: this.inputCity.value.trim(),
      country: COUNTRY_CODES[this.inputCountry.value] ?? '',
      postalCode: this.inputPostcode.value.trim(),
      streetName: this.inputStreet.value.trim(),
    };
  }

  private setStyles(): void {
    this.inputCountry.addClassNames(styles.formItem);
    this.inputCity.addClassNames(styles.formItem);
    this.inputStreet.addClassNames(styles.formItem);
    this.inputPostcode.addClassNames(styles.formItem);
    this.inputDefaultBilling.addClassNames(styles.detailsItem);
    this.inputDefaultShipping.addClassNames(styles.detailsItem);
  }

  private setupListeners(): void {
    this.inputCountry.addListener('change', () => {
      if (this.inputPostcode.value) {
        this.inputPostcode.validate();
      }
    });

    this.cancelButton.addListener('click', this.onCancel);

    this.addListener('click', (event) => {
      event.preventDefault();

      this.onSubmit(this.getPayload());
    });
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputCountry);
    this.addInputComponent(this.inputPostcode);
    this.addInputComponent(this.inputCity);
    this.addInputComponent(this.inputStreet);
  }
}
