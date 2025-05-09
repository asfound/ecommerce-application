import type { ValidatorFunction } from './input';

const EMAIL_VALIDATION_ERROR = {
  INCORRECT_FORMAT:
    'Please enter your email address in the correct format (e.g., user@example.com)',
  WHITESPACES: 'Email must not contain white spaces',
} as const;

const VALIDATION_ERROR = {
  REQUIRED: 'Field is required',
} as const;

export const validateEmailFormat: ValidatorFunction = (value) => {
  const emailRegex = /^[^@]+@[^@]+\.[^@.]{2,}$/;
  return emailRegex.test(value) ? null : EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT;
};

export const validateNoSpaces: ValidatorFunction = (value) => {
  const hasLeadingOrTrailingSpaces = value !== value.trim();
  const hasSpaces = value.includes(' ');
  return hasLeadingOrTrailingSpaces || hasSpaces ? EMAIL_VALIDATION_ERROR.WHITESPACES : null;
};

export const required: ValidatorFunction = (value) => {
  return value.length === 0 ? VALIDATION_ERROR.REQUIRED : null;
};
