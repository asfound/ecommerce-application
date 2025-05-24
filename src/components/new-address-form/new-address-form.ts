import { BUTTON_TEXT } from '~/shared/constants/constants';
import { COUNTRY_CODES, COUNTRY_NAMES } from '~/shared/constants/country-codes';
import {
  CITY_PROPS,
  COUNTRY_LIST_ID,
  DEFAULT_CHECKBOX_PROPS,
  STREET_PROPS,
  UNIVERSAL_COUNTRY_PROPS,
  UNIVERSAL_POSTAL_CODE_PROPS,
} from '~/shared/constants/input-properties';
import { datalist, div, form, option } from '~/shared/create-element/tags';
import { validatePostalCode } from '~/shared/form-validators/form-validators';

import type { Component } from '../base-component/types';
import type { InputBase } from '../common/input/input-base';

import { BaseComponent } from '../base-component/base-component';
import { Button } from '../common/button/button';
import { InputCheckbox } from '../common/input/input-checkbox/input-checkbox';
import { InputText } from '../common/input/input-text/input-text';
import styles from './new-address-form.module.css';

export interface AddressFormProperties {
  onCancel(): void;
  onSubmit(data: NewAddressFormData): void;
}

export interface NewAddressFormData {
  address: {
    city: string;
    country: string;
    postalCode: string;
    streetName: string;
  };
  default?: boolean;
}

export class NewAddressForm extends BaseComponent implements Component {
  private readonly onCancel: () => void;

  private readonly cancelButton = new Button({
    onClick: (): void => {
      this.onCancel();
      this.destroy();
    },
    textContent: BUTTON_TEXT.CANCEL,
    type: 'button',
  });

  private readonly formElement = form({ className: styles.form });

  private readonly inputCity = new InputText(CITY_PROPS);

  private readonly inputComponents: InputBase[] = [];

  private readonly inputCountry = new InputText(UNIVERSAL_COUNTRY_PROPS);

  private readonly inputDefault = new InputCheckbox(DEFAULT_CHECKBOX_PROPS);

  private readonly inputPostcode = new InputText(UNIVERSAL_POSTAL_CODE_PROPS);

  private readonly inputStreet = new InputText(STREET_PROPS);

  private readonly onSubmit: (data: NewAddressFormData) => void;

  private readonly submitButton = new Button({
    textContent: BUTTON_TEXT.ADD,
    type: 'submit',
  });

  public constructor(properties: AddressFormProperties) {
    super({ tagName: 'form' });

    this.onSubmit = (data): void => {
      properties.onSubmit(data);
    };

    this.onCancel = (): void => {
      properties.onCancel();
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
    this.formElement.append(
      div({ className: styles.formTitle }, 'New address details:'),
      this.inputCountry.element,
      this.inputPostcode.element,
      this.inputCity.element,
      this.inputStreet.element,
      this.inputDefault.element,

      this.cancelButton.element,
      this.submitButton.element,
      this.createDataList(),
    );

    this.submitButton.disable();

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

  private getPayload(): NewAddressFormData {
    return {
      address: {
        city: this.inputCity.value.trim(),
        country: COUNTRY_CODES[this.inputCountry.value] ?? '',
        postalCode: this.inputPostcode.value.trim(),
        streetName: this.inputStreet.value.trim(),
      },
      default: this.inputDefault.checked,
    };
  }

  private setStyles(): void {
    this.inputCountry.addClassNames(styles.formItem);
    this.inputCity.addClassNames(styles.formItem);
    this.inputStreet.addClassNames(styles.formItem);
    this.inputPostcode.addClassNames(styles.formItem);

    this.cancelButton.addClassNames(styles.formItem);
    this.submitButton.addClassNames(styles.formItem);
  }

  private setupListeners(): void {
    this.inputCountry.addListener('change', () => {
      if (this.inputPostcode.value) {
        this.inputPostcode.validate();
      }
    });

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
