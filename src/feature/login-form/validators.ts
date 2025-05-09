import type { ValidatorFunction } from './input';

const EMAIL_VALIDATION_ERROR = {
  INCORRECT_FORMAT: 'Please enter email in the correct format (e.g., user@example.com)',
  WHITESPACES: 'Email must not contain white spaces',
} as const;

const VALIDATION_ERROR = {
  HAS_DIGIT: 'Must contain at least one digit (0–9).',
  HAS_LOWERCASE: 'Must contain at least one lowercase letter (a–z).',
  HAS_UPPERCASE: 'Must contain at least one uppercase letter (A–Z).',
  MIN_LENGTH: (required: number, current: number) =>
    `Minimum required length is ${required.toString()} characters. You entered ${current.toString()}`,
  ONLY_ENGLISH_LETTERS: 'Only English letters (A–Z, a–z) are allowed.',
  REQUIRED: 'Field is required',
} as const;

export const PASSWORD_LENGTH = 8;

export const validateEmailFormat: ValidatorFunction = (value) => {
  const emailRegex = /^[^@]+@[^@]+\.[^@.]{2,}$/;
  return emailRegex.test(value) ? null : EMAIL_VALIDATION_ERROR.INCORRECT_FORMAT;
};

export const validateNoSpaces: ValidatorFunction = (value) => {
  const hasLeadingOrTrailingSpaces = value !== value.trim();
  const hasSpaces = value.includes(' ');
  return hasLeadingOrTrailingSpaces || hasSpaces ? EMAIL_VALIDATION_ERROR.WHITESPACES : null;
};

export const validateRequired: ValidatorFunction = (value) => {
  return value.length === 0 ? VALIDATION_ERROR.REQUIRED : null;
};

export const validateMinLength = (length: number) => {
  return (value: string): null | string => {
    const currentLength = value.trim().length;
    return currentLength < length ? VALIDATION_ERROR.MIN_LENGTH(length, currentLength) : null;
  };
};

export const validateHasUppercase: ValidatorFunction = (value) => {
  return /[A-Z]/.test(value) ? null : VALIDATION_ERROR.HAS_UPPERCASE;
};

export const validateHasLowercase: ValidatorFunction = (value) => {
  return /[a-z]/.test(value) ? null : VALIDATION_ERROR.HAS_LOWERCASE;
};

export const validateHasDigit: ValidatorFunction = (value) => {
  return /\d/.test(value) ? null : VALIDATION_ERROR.HAS_DIGIT;
};

export const validateOnlyEnglishLetters: ValidatorFunction = (value) => {
  return /^[a-zA-Z0-9]+$/.test(value) ? null : VALIDATION_ERROR.ONLY_ENGLISH_LETTERS;
};
