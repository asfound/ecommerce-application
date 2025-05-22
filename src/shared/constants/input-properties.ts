import type { InputBaseProperties } from '~/components/common/input/input-base';
import type { InputCheckboxProperties } from '~/components/common/input/input-checkbox/input-checkbox';
import type { InputTextProperties } from '~/components/common/input/input-text/input-text';

import * as validators from '../form-validators/form-validators';
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
  UNIVERSAL: 'country-list',
};

export const EMAIL_PROPS: InputTextProperties = {
  name: 'email',
  placeholder: 'Email',
  validators: [
    validators.validateRequired,
    validators.validateNoSpaces,
    validators.validateEmailFormat,
  ],
} as const;

export const PASSWORD_PROPS: InputTextProperties = {
  name: 'password',
  placeholder: 'Password',
  validators: [
    validators.validateRequired,
    validators.validateNoSpaces,
    validators.validateOnlyEnglishLetters,
    validators.validateMinLength(REQUIRED_PASSWORD_LENGTH),
    validators.validateHasUppercase,
    validators.validateHasLowercase,
    validators.validateHasDigit,
  ],
} as const;

export const OLD_PASSWORD_PROPS: InputTextProperties = {
  ...PASSWORD_PROPS,
  placeholder: 'Old password',
} as const;

export const NEW_PASSWORD_PROPS: InputTextProperties = {
  ...PASSWORD_PROPS,
  placeholder: 'New password',
} as const;

export const FIRST_NAME_PROPS: InputTextProperties = {
  name: 'first-name',
  placeholder: 'First Name',
  validators: [
    validators.validateRequired,
    validators.validateOnlyEnglishLetters,
    validators.validateMinLength(REQUIRED_NAME_LENGTH),
    validators.validateHasNoDigit,
  ],
} as const;

export const LAST_NAME_PROPS: InputTextProperties = {
  name: 'last-name',
  placeholder: 'Last Name',
  validators: [
    validators.validateRequired,
    validators.validateOnlyEnglishLetters,
    validators.validateMinLength(REQUIRED_NAME_LENGTH),
    validators.validateHasNoDigit,
  ],
} as const;

export const DATE_OF_BIRTH_PROPS: InputTextProperties = {
  name: 'date-of-birth',
  placeholder: 'Date of birth',
  validators: [validators.validateRequired, validators.validateMinAge(REQUIRED_MIN_AGE)],
} as const;

export const SHIPPING_COUNTRY_PROPS: InputTextProperties = {
  listId: COUNTRY_LIST_ID.SHIPPING,
  name: 'shipping-country',
  placeholder: 'Start typing a country...',
  validators: [validators.validateRequired, validators.validateDatalistValue(COUNTRY_NAMES)],
} as const;

export const BILLING_COUNTRY_PROPS: InputTextProperties = {
  listId: COUNTRY_LIST_ID.BILLING,
  name: 'billing-country',
  placeholder: 'Start typing a country...',
  validators: [validators.validateRequired, validators.validateDatalistValue(COUNTRY_NAMES)],
} as const;

export const UNIVERSAL_COUNTRY_PROPS: InputTextProperties = {
  listId: COUNTRY_LIST_ID.UNIVERSAL,
  name: 'country',
  placeholder: 'Start typing a country...',
  validators: [validators.validateRequired, validators.validateDatalistValue(COUNTRY_NAMES)],
} as const;

export const CITY_PROPS: InputTextProperties = {
  name: 'city',
  placeholder: 'City',
  validators: [
    validators.validateRequired,
    validators.validateOnlyEnglishLetters,
    validators.validateMinLength(REQUIRED_STREET_AND_CITY_LENGTH),
    validators.validateHasNoDigit,
  ],
} as const;

export const STREET_PROPS: InputTextProperties = {
  name: 'street',
  placeholder: 'Street',
  validators: [
    validators.validateRequired,
    validators.validateMinLength(REQUIRED_STREET_AND_CITY_LENGTH),
  ],
} as const;

const BASE_POSTAL_CODE_PROPS: InputTextProperties = {
  placeholder: 'Postal Code',
  validators: [validators.validateRequired],
};

export const SHIPPING_POSTAL_CODE_PROPS: InputTextProperties = {
  ...BASE_POSTAL_CODE_PROPS,
  name: 'shipping-postal-code',
} as const;

export const BILLING_POSTAL_CODE_PROPS: InputTextProperties = {
  ...BASE_POSTAL_CODE_PROPS,
  name: 'billing-postal-code',
} as const;

export const UNIVERSAL_POSTAL_CODE_PROPS: InputTextProperties = {
  ...BASE_POSTAL_CODE_PROPS,
  name: 'postal-code',
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
  validators: [validators.validateEmailFormat],
} as const;

export const SEARCH_PROPS: InputBaseProperties = {
  name: 'search',
  placeholder: 'Search all products',
} as const;

export const DEFAULT_BILLING_CHECKBOX_PROPS: InputCheckboxProperties = {
  label: 'Default for billing',
  name: 'default-billing-checkbox',
} as const;

export const DEFAULT_SHIPPING_CHECKBOX_PROPS: InputCheckboxProperties = {
  label: 'Default for shipping',
  name: 'default-shipping-checkbox',
} as const;
