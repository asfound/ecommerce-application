import type { CustomerAddress, SignupPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { Input } from '~/components/common/input/input';
import { COUNTRY_NAMES } from '~/shared/constants/country-codes';
import {
  BILLING_COUNTRY_PROPS,
  BILLING_POSTAL_CODE_PROPS,
  CITY_PROPS,
  COUNTRY_LIST_ID,
  DATE_OF_BIRTH_PROPS,
  DEFAULT_CHECKBOX_PROPS,
  EMAIL_PROPS,
  FIRST_NAME_PROPS,
  LAST_NAME_PROPS,
  PASSWORD_PROPS,
  SHIPPING_COUNTRY_PROPS,
  SHIPPING_POSTAL_CODE_PROPS,
  STREET_PROPS,
  USE_FOR_BILLING_PROPS,
} from '~/shared/constants/input-properties';
import { datalist, div, fieldset, form, h1, legend, option } from '~/shared/create-element/tags';
import { validatePostalCode } from '~/shared/form-validators/form-validators';

import styles from './registration-form.module.css';

export class RegistrationFormView extends BaseComponent implements Component {
  private billingAddressFieldset: HTMLElement | null = null;

  private readonly inputBillingCity = new Input(CITY_PROPS);

  private readonly inputBillingCountry = new Input(BILLING_COUNTRY_PROPS);

  private readonly inputBillingPostcode = new Input(BILLING_POSTAL_CODE_PROPS);

  private readonly inputBillingSetDefault = new Input(DEFAULT_CHECKBOX_PROPS);

  private readonly inputBillingStreet = new Input(STREET_PROPS);

  private readonly billingInputs = [
    this.inputBillingCountry.element,
    this.inputBillingCity.element,
    this.inputBillingStreet.element,
    this.inputBillingPostcode.element,
    this.inputBillingSetDefault.element,
  ];

  private readonly formElement = form({ className: styles.form });

  private readonly inputBirthDate = new Input(DATE_OF_BIRTH_PROPS);

  private readonly inputComponents: Input[] = [];

  private readonly inputEmail = new Input(EMAIL_PROPS);

  private readonly inputFirstName = new Input(FIRST_NAME_PROPS);

  private readonly inputLastName = new Input(LAST_NAME_PROPS);

  private readonly inputPassword = new Input(PASSWORD_PROPS);

  private readonly inputShippingAsBilling = new Input(USE_FOR_BILLING_PROPS);

  private readonly inputShippingCity = new Input(CITY_PROPS);

  private readonly inputShippingCountry = new Input(SHIPPING_COUNTRY_PROPS);

  private readonly inputShippingPostcode = new Input(SHIPPING_POSTAL_CODE_PROPS);

  private readonly inputShippingSetDefault = new Input(DEFAULT_CHECKBOX_PROPS);

  private readonly inputShippingStreet = new Input(STREET_PROPS);

  private readonly shippingInputs = [
    this.inputShippingCountry.element,
    this.inputShippingCity.element,
    this.inputShippingStreet.element,
    this.inputShippingPostcode.element,
    this.inputShippingSetDefault.element,
    this.inputShippingAsBilling.element,
  ];

  private readonly submitButton = new Button({
    textContent: 'Register',
    type: 'submit',
  });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.createHTML();

    this.setupListeners();
  }

  public bindSubmitHandler(handler: (payload: SignupPayload) => void): void {
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

    if (formValid) {
      this.submitButton.enable();
    } else {
      this.submitButton.disable();
    }
  }

  public createHTML(): void {
    this.storeInputs();

    const formHeader = div(
      { className: styles.formHeader },
      h1({ className: styles.formTitle }, 'Register'),
      div({ className: styles.formSubtitle }, 'Please fill in the fields below'),
    );

    this.submitButton.disable();

    const accountDetailsFieldset = this.createAccountDetailsFieldset();

    const shippingAddressFieldset = this.createAddressFieldset(
      'Shipping address:',
      this.shippingInputs,
      COUNTRY_LIST_ID.SHIPPING,
    );

    this.inputShippingPostcode.addValidator(
      validatePostalCode(() => this.inputShippingCountry.value),
    );

    this.billingAddressFieldset = this.createAddressFieldset(
      'Billing address:',
      this.billingInputs,
      COUNTRY_LIST_ID.BILLING,
    );

    this.inputBillingPostcode.addValidator(
      validatePostalCode(() => this.inputBillingCountry.value),
    );

    this.formElement.append(
      formHeader,
      accountDetailsFieldset,
      shippingAddressFieldset,
      this.billingAddressFieldset,
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

  public setupListeners(): void {
    this.inputShippingCountry.addListener('change', () => {
      if (this.inputShippingPostcode.value) {
        this.inputShippingPostcode.validate();
      }
    });

    this.inputBillingCountry.addListener('change', () => {
      if (this.inputBillingPostcode.value) {
        this.inputBillingPostcode.validate();
      }
    });

    this.inputShippingAsBilling.addListener('change', () => {
      this.billingAddressFieldset?.classList.toggle(
        styles.hidden,
        this.inputShippingAsBilling.checked,
      );
    });
  }

  private addInput(input: Input): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }

  private createAccountDetailsFieldset(): HTMLFieldSetElement {
    const accountDetailsLegend = legend({ className: styles.legend }, 'Account details:');

    return fieldset(
      { className: styles.fieldset },
      accountDetailsLegend,
      this.inputFirstName.element,
      this.inputLastName.element,
      this.inputBirthDate.element,
      this.inputEmail.element,
      this.inputPassword.element,
    );
  }

  private createAddressFieldset(
    legendValue: string,
    inputs: HTMLElement[],
    listId: string,
  ): HTMLFieldSetElement {
    const legendElement = legend({ className: styles.legend }, legendValue);
    const countriesDatalist = this.createDataList(listId, COUNTRY_NAMES);

    return fieldset({ className: styles.fieldset }, legendElement, ...inputs, countriesDatalist);
  }

  private createDataList(listId: string, listItems: string[]): HTMLDataListElement {
    const datalistElement = datalist({ id: listId });

    for (const item of listItems) {
      const optionElement = option({ value: item });
      datalistElement.append(optionElement);
    }

    return datalistElement;
  }

  private getPayload(): SignupPayload {
    const shippingAddress: CustomerAddress = {
      city: this.inputShippingCity.value.trim(),
      country: this.inputShippingCountry.value.trim(),
      default: this.inputShippingSetDefault.checked,
      postalCode: this.inputShippingPostcode.value.trim(),
      streetName: this.inputShippingStreet.value.trim(),
    };

    const shippingAsBilling = this.inputShippingAsBilling.checked;

    const billingAddress: CustomerAddress | undefined = shippingAsBilling
      ? undefined
      : {
          city: this.inputBillingCity.value.trim(),
          country: this.inputBillingCountry.value.trim(),
          default: this.inputBillingSetDefault.checked,
          postalCode: this.inputBillingPostcode.value.trim(),
          streetName: this.inputBillingStreet.value.trim(),
        };

    return {
      addresses: {
        billingAddress,
        shippingAddress,
        shippingAsBilling,
      },
      dateOfBirth: this.inputBirthDate.value.trim(),
      email: this.inputEmail.value.trim(),
      firstName: this.inputFirstName.value.trim(),
      lastName: this.inputLastName.value.trim(),
      password: this.inputPassword.value.trim(),
    };
  }

  private storeInputs(): void {
    this.addInput(this.inputFirstName);
    this.addInput(this.inputLastName);
    this.addInput(this.inputBirthDate);
    this.addInput(this.inputEmail);
    this.addInput(this.inputPassword);

    this.addInput(this.inputShippingCountry);
    this.addInput(this.inputShippingCity);
    this.addInput(this.inputShippingStreet);
    this.addInput(this.inputShippingPostcode);

    this.addInput(this.inputBillingCountry);
    this.addInput(this.inputBillingCity);
    this.addInput(this.inputBillingStreet);
    this.addInput(this.inputBillingPostcode);
  }
}
