import type { InputCheckboxProperties } from '~/components/common/input/input-checkbox/input-checkbox';
import type { InputTextProperties } from '~/components/common/input/input-text/input-text';

import {
  validateDatalistValue,
  validateEmailFormat,
  validateHasDigit,
  validateHasLowercase,
  validateHasUppercase,
  validateMinAge,
  validateMinLength,
  validateNoSpaces,
  validateOnlyEnglishLetters,
  validateRequired,
} from '../form-validators/form-validators';
import {
  REQUIRED_MIN_AGE,
  REQUIRED_NAME_LENGTH,
  REQUIRED_PASSWORD_LENGTH,
  REQUIRED_STREET_AND_CITY_LENGTH,
} from './constants';
import { COUNTRY_NAMES } from './country-codes';

export const COUNTRY_LIST_ID = {
  BILLING: 'billing-country-list',
  SHIPPING: 'shipping-country-list',
};

export const EMAIL_PROPS: InputTextProperties = {
  name: 'email',
  placeholder: 'Email',
  validators: [validateRequired, validateNoSpaces, validateEmailFormat],
} as const;

export const PASSWORD_PROPS: InputTextProperties = {
  name: 'password',
  placeholder: 'Password',
  validators: [
    validateRequired,
    validateNoSpaces,
    validateOnlyEnglishLetters,
    validateMinLength(REQUIRED_PASSWORD_LENGTH),
    validateHasUppercase,
    validateHasLowercase,
    validateHasDigit,
  ],
} as const;

export const FIRST_NAME_PROPS: InputTextProperties = {
  name: 'first-name',
  placeholder: 'First Name',
  validators: [
    validateRequired,
    validateOnlyEnglishLetters,
    validateMinLength(REQUIRED_NAME_LENGTH),
  ],
} as const;

export const LAST_NAME_PROPS: InputTextProperties = {
  name: 'last-name',
  placeholder: 'Last Name',
  validators: [
    validateRequired,
    validateOnlyEnglishLetters,
    validateMinLength(REQUIRED_NAME_LENGTH),
  ],
} as const;

export const DATE_OF_BIRTH_PROPS: InputTextProperties = {
  name: 'date-of-birth',
  placeholder: 'Date of birth',
  validators: [validateRequired, validateMinAge(REQUIRED_MIN_AGE)],
} as const;

export const SHIPPING_COUNTRY_PROPS: InputTextProperties = {
  listId: COUNTRY_LIST_ID.SHIPPING,
  name: 'shipping-country',
  placeholder: 'Start typing a country...',
  validators: [validateRequired, validateDatalistValue(COUNTRY_NAMES)],
} as const;

export const BILLING_COUNTRY_PROPS: InputTextProperties = {
  listId: COUNTRY_LIST_ID.BILLING,
  name: 'billing-country',
  placeholder: 'Start typing a country...',
  validators: [validateRequired, validateDatalistValue(COUNTRY_NAMES)],
} as const;

export const CITY_PROPS: InputTextProperties = {
  name: 'city',
  placeholder: 'City',
  validators: [
    validateRequired,
    validateOnlyEnglishLetters,
    validateMinLength(REQUIRED_STREET_AND_CITY_LENGTH),
  ],
} as const;

export const STREET_PROPS: InputTextProperties = {
  name: 'street',
  placeholder: 'Street',
  validators: [validateRequired, validateMinLength(REQUIRED_STREET_AND_CITY_LENGTH)],
} as const;

export const SHIPPING_POSTAL_CODE_PROPS: InputTextProperties = {
  name: 'shipping-postal-code',
  placeholder: 'Postal Code',
  validators: [validateRequired],
} as const;

export const BILLING_POSTAL_CODE_PROPS: InputTextProperties = {
  name: 'billing-postal-code',
  placeholder: 'Postal Code',
  validators: [validateRequired],
} as const;

export const DEFAULT_CHECKBOX_PROPS: InputCheckboxProperties = {
  label: 'Set as default',
  name: 'default-checkbox',
} as const;

export const USE_FOR_BILLING_PROPS: InputCheckboxProperties = {
  label: 'Use for billing',
  name: 'billing-as-shipping-checkbox',
} as const;

export const SUBSCRIPTION_EMAIL_PROPS: InputTextProperties = {
  name: 'email',
  placeholder: 'Email',
  validators: [validateEmailFormat],
} as const;
