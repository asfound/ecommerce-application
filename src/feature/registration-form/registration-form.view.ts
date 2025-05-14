import type { CustomerAddress, SignupPayload } from '~/api/services/auth/types';
import type { Component } from '~/components/base-component/types';
import type { BaseInput } from '~/components/common/input/base-input';
import type { Input } from '~/components/common/input/input';

import { ROUTE_PATH } from '~/app/router/route-path';
import { BaseComponent } from '~/components/base-component/base-component';
import { Button } from '~/components/common/button/button';
import { ErrorMessage } from '~/components/common/error-message/error-message';
import { InputCheckbox } from '~/components/common/input/input-checkbox/input-checkbox';
import { InputDate } from '~/components/common/input/input-date/input-date';
import { InputPassword } from '~/components/common/input/input-password/input-password';
import { InputText } from '~/components/common/input/input-text/input-text';
import { FormHeader } from '~/components/form-header/form-header';
import { COUNTRY_CODES, COUNTRY_NAMES } from '~/shared/constants/country-codes';
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
import { a, datalist, div, fieldset, form, legend, option } from '~/shared/create-element/tags';
import { validatePostalCode } from '~/shared/form-validators/form-validators';

import { REGISTRATION_FORM_TEXT } from './constants';
import styles from './registration-form.module.css';

export class RegistrationFormView extends BaseComponent implements Component {
  private billingAddressFieldset: HTMLElement | null = null;

  private readonly inputBillingCity = new InputText(CITY_PROPS);

  private readonly inputBillingCountry = new InputText(BILLING_COUNTRY_PROPS);

  private readonly inputBillingPostcode = new InputText(BILLING_POSTAL_CODE_PROPS);

  private readonly inputBillingSetDefault = new InputCheckbox(DEFAULT_CHECKBOX_PROPS);

  private readonly inputBillingStreet = new InputText(STREET_PROPS);

  private readonly billingInputs: (BaseInput | Input)[] = [
    this.inputBillingCountry,
    this.inputBillingCity,
    this.inputBillingStreet,
    this.inputBillingPostcode,
    this.inputBillingSetDefault,
  ];

  private readonly errorMessageComponent = new ErrorMessage();

  private readonly formElement = form({ className: styles.form });

  private readonly inputBirthDate = new InputDate(DATE_OF_BIRTH_PROPS);

  private inputComponents: (BaseInput | Input)[] = [];

  private readonly inputEmail = new InputText(EMAIL_PROPS);

  private readonly inputFirstName = new InputText(FIRST_NAME_PROPS);

  private readonly inputLastName = new InputText(LAST_NAME_PROPS);

  private readonly inputPassword = new InputPassword(PASSWORD_PROPS);

  private readonly inputShippingAsBilling = new InputCheckbox(USE_FOR_BILLING_PROPS);

  private readonly inputShippingCity = new InputText(CITY_PROPS);

  private readonly inputShippingCountry = new InputText(SHIPPING_COUNTRY_PROPS);

  private readonly inputShippingPostcode = new InputText(SHIPPING_POSTAL_CODE_PROPS);

  private readonly inputShippingSetDefault = new InputCheckbox(DEFAULT_CHECKBOX_PROPS);

  private readonly inputShippingStreet = new InputText(STREET_PROPS);

  private readonly loginLinkElement = a({ href: ROUTE_PATH.REGISTRATION }, 'Log in');

  private readonly shippingInputs = [
    this.inputShippingCountry,
    this.inputShippingCity,
    this.inputShippingStreet,
    this.inputShippingPostcode,
    this.inputShippingSetDefault,
    this.inputShippingAsBilling,
  ];

  private readonly submitButton = new Button({
    textContent: REGISTRATION_FORM_TEXT.REGISTER,
    type: 'submit',
  });

  public constructor() {
    super({ className: styles.container, tagName: 'div' });

    this.createHTML();

    this.setupListeners();
  }

  public bindRegistrationLinkHandler(handler: () => void): void {
    this.loginLinkElement.addEventListener(
      'click',
      (event) => {
        event.preventDefault();

        handler();
      },
      { signal: this.abortController.signal },
    );
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

    const formHeader = new FormHeader({
      subtitle: REGISTRATION_FORM_TEXT.SUBTITLE,
      title: REGISTRATION_FORM_TEXT.TITLE,
    });

    const loginLinkContainer = div(
      { className: styles.linkContainer },
      REGISTRATION_FORM_TEXT.HAVE_ACCOUNT,
      this.loginLinkElement,
    );

    this.submitButton.disable();

    const accountDetailsFieldset = this.createAccountDetailsFieldset();

    const shippingAddressFieldset = this.createAddressFieldset(
      REGISTRATION_FORM_TEXT.FIELDSET_SHIPPING,
      this.shippingInputs.map((input) => input.element),
      COUNTRY_LIST_ID.SHIPPING,
    );

    this.inputShippingPostcode.addValidator(
      validatePostalCode(() => this.inputShippingCountry.value),
    );

    this.billingAddressFieldset = this.createAddressFieldset(
      REGISTRATION_FORM_TEXT.FIELDSET_BILLING,
      this.billingInputs.map((input) => input.element),
      COUNTRY_LIST_ID.BILLING,
    );

    this.inputBillingPostcode.addValidator(
      validatePostalCode(() => this.inputBillingCountry.value),
    );

    this.formElement.append(
      formHeader.element,
      this.errorMessageComponent.element,
      accountDetailsFieldset,
      shippingAddressFieldset,
      this.billingAddressFieldset,
      this.submitButton.element,
      loginLinkContainer,
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

  public hideError(): void {
    this.errorMessageComponent.hide();
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
      const isBillingHidden = this.inputShippingAsBilling.checked;

      this.billingAddressFieldset?.classList.toggle(styles.hidden, isBillingHidden);

      if (isBillingHidden) {
        this.removeBillingAddressInputs();
      } else {
        this.recoverBillingAddressInputs();
      }

      this.checkValidity();
    });
  }

  public showError(errorMessage: string): void {
    this.errorMessageComponent.show(errorMessage);
  }

  private addInputComponent(input: BaseInput | Input): void {
    this.inputComponents.push(input);

    input.addListener('input', () => {
      this.checkValidity();
    });
  }

  private createAccountDetailsFieldset(): HTMLFieldSetElement {
    const accountDetailsLegend = legend(
      { className: styles.legend },
      REGISTRATION_FORM_TEXT.ACCOUNT_DETAILS,
    );

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
      country: COUNTRY_CODES[this.inputShippingCountry.value.trim()],
      default: this.inputShippingSetDefault.checked,
      postalCode: this.inputShippingPostcode.value.trim(),
      streetName: this.inputShippingStreet.value.trim(),
    };

    const shippingAsBilling = this.inputShippingAsBilling.checked;

    const billingAddress: CustomerAddress | undefined = shippingAsBilling
      ? undefined
      : {
          city: this.inputBillingCity.value.trim(),
          country: COUNTRY_CODES[this.inputBillingCountry.value.trim()],
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

  private recoverBillingAddressInputs(): void {
    for (const input of this.billingInputs) {
      if (input !== this.inputBillingSetDefault && !this.inputComponents.includes(input)) {
        this.inputComponents.push(input);
      }
    }
  }

  private removeBillingAddressInputs(): void {
    this.inputComponents = this.inputComponents.filter(
      (component) => !this.billingInputs.includes(component),
    );
  }

  private storeInputs(): void {
    this.addInputComponent(this.inputFirstName);
    this.addInputComponent(this.inputLastName);
    this.addInputComponent(this.inputBirthDate);
    this.addInputComponent(this.inputEmail);
    this.addInputComponent(this.inputPassword);

    this.addInputComponent(this.inputShippingCountry);
    this.addInputComponent(this.inputShippingCity);
    this.addInputComponent(this.inputShippingStreet);
    this.addInputComponent(this.inputShippingPostcode);

    this.addInputComponent(this.inputBillingCountry);
    this.addInputComponent(this.inputBillingCity);
    this.addInputComponent(this.inputBillingStreet);
    this.addInputComponent(this.inputBillingPostcode);
  }
}
