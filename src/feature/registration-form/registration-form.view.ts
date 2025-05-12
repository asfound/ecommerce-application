import type { CustomerAddress, SignupPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';

import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { Input } from '~/components/common/input/input';
import { countryNamesList } from '~/shared/constants/country-codes';
import {
  CITY_PROPS,
  COUNTRY_LIST_ID,
  COUNTRY_PROPS,
  DATE_OF_BIRTH_PROPS,
  EMAIL_PROPS,
  FIRST_NAME_PROPS,
  LAST_NAME_PROPS,
  PASSWORD_PROPS,
  POSTAL_CODE_PROPS,
  STREET_PROPS,
} from '~/shared/constants/input-properties';
import { datalist, div, fieldset, form, h1, legend, option } from '~/shared/create-element/tags';
import { validatePostalCode } from '~/shared/form-validators/form-validators';

import styles from './registration-form.module.css';

export class RegistrationFormView extends BaseComponent implements Component {
  private readonly formElement = form({ className: styles.form });

  private readonly inputBirthDate = new Input(DATE_OF_BIRTH_PROPS);

  private readonly inputCity = new Input(CITY_PROPS);

  private readonly inputComponents: Input[] = [];

  private readonly inputCountry = new Input(COUNTRY_PROPS);

  private readonly inputEmail = new Input(EMAIL_PROPS);

  private readonly inputFirstName = new Input(FIRST_NAME_PROPS);

  private readonly inputLastName = new Input(LAST_NAME_PROPS);

  private readonly inputPassword = new Input(PASSWORD_PROPS);

  private readonly inputPostalCode = new Input(POSTAL_CODE_PROPS);

  private readonly inputStreet = new Input(STREET_PROPS);

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

        const signupPayload = this.getPayload();
        handler(signupPayload);
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
    // shouldn't we do this in constructor?
    this.storeInputs();

    const formHeader = div(
      { className: styles.formHeader },
      h1({ className: styles.formTitle }, 'Register'),
      div({ className: styles.formSubtitle }, 'Please fill in the fields below'),
    );

    this.submitButton.disable();

    const accountDetailsLegend = legend({ className: styles.legend }, 'Account details:');
    const accountDetailsFieldset = fieldset(
      { className: styles.fieldset },
      accountDetailsLegend,
      this.inputFirstName.element,
      this.inputLastName.element,
      this.inputBirthDate.element,
      this.inputEmail.element,
      this.inputPassword.element,
    );

    // add address fieldset component or add more inputs for billing?
    const shippingAddressFieldset = this.createShippingAddressFieldset('Shipping address:');

    this.formElement.append(
      formHeader,
      accountDetailsFieldset,
      shippingAddressFieldset,
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

  private createDataList(listId: string, listItems: string[]): HTMLDataListElement {
    const datalistElement = datalist({ id: listId });

    for (const item of listItems) {
      const optionElement = option({ value: item });
      datalistElement.append(optionElement);
    }

    return datalistElement;
  }

  private createShippingAddressFieldset(legendValue: string): HTMLFieldSetElement {
    const legendElement = legend({ className: styles.legend }, legendValue);
    const countriesDatalist = this.createDataList(COUNTRY_LIST_ID, countryNamesList);

    //TODO: reset if country changes
    this.inputPostalCode.addValidator(validatePostalCode(() => this.inputCountry.value));

    return fieldset(
      { className: styles.fieldset },
      legendElement,
      this.inputCountry.element,
      this.inputCity.element,
      this.inputStreet.element,
      this.inputPostalCode.element,
      countriesDatalist,
    );
  }

  private getPayload(): SignupPayload {
    const address: CustomerAddress = {
      city: this.inputCity.value.trim(),
      country: this.inputCountry.value.trim(),
      default: true, // un-hardcode
      postalCode: this.inputPostalCode.value.trim(),
      streetName: this.inputStreet.value.trim(),
    };

    return {
      addresses: {
        shippingAddress: address,
        shippingAsBilling: true, // un-hardcode
      },
      dateOfBirth: this.inputBirthDate.value.trim(),
      email: this.inputEmail.value.trim(),
      firstName: this.inputFirstName.value.trim(),
      lastName: this.inputLastName.value.trim(),
      password: this.inputPassword.value.trim(),
    };
  }

  private storeInputs(): void {
    this.addInput(this.inputEmail);
    this.addInput(this.inputPassword);
    this.addInput(this.inputFirstName);
    this.addInput(this.inputLastName);
    this.addInput(this.inputBirthDate);
    this.addInput(this.inputCountry);
    this.addInput(this.inputCity);
    this.addInput(this.inputStreet);
    this.addInput(this.inputPostalCode);
  }
}
